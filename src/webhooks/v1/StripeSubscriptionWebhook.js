const sequelize = require('sequelize')
const {UserSubscription, Subscription, User} = require("../../models")
const UserSubscriptionStatusValues = require("../../models/values/UserSubscriptionStatus")
const PaymentTypeValues = require("../../models/values/PaymentType")
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const StripeSubscriptionStatus = require("../../models/values/StripeSubscriptionStatus")
const UserSubscriptionStatus = require("../../models/values/UserSubscriptionStatus")
const {getSubscriptionsData} = require("./helpers/stripeSubscriptionWebhookHelper")
const StripePaymentLogStatusValues = require("../../models/values/StripePaymentLogStatus")
const StripePaymentLogTypeValues = require("../../models/values/StripePaymentLogType")
const {createStripePaymentLog} = require("../../services/stripePaymentLogService")
const statuses = require("../../constants/statuses.json")
const uuidService = require("../../services/uuidService")
const { DateTime } = require("luxon");
const { stripeChargeSuccessHandler } = require('./helpers/stripeSubscriptionWebhookHelper');

/*****Functions******* */
const invoicePaidHandler = async(req) => {
  const {data: {object: invoice}} = req.body
  const subscriptionsData = await getSubscriptionsData(invoice)
  if (subscriptionsData.type === statuses.ERROR) {
    return
  }
  const {stripeSubscription, userSubscription} = subscriptionsData
  await stripeSubscription.update({
    statusId: StripeSubscriptionStatus.ACTIVE.id
  });

  await userSubscription.update({
    statusId: UserSubscriptionStatus.ACTIVE.id
  });

  //Create payment log
  const stripePaymentLog = await createStripePaymentLog({
    response: req.body, 
    typeId: StripePaymentLogTypeValues.SUBSCRIPTION.id, 
    statusId: StripePaymentLogStatusValues.SUCCESS.id
  })

  await stripeSubscription.update({
    stripePaymentLogId: stripePaymentLog.id
  });
}

const invoicePaymentFailedHandler = async(req) => {
  const {data: {object: invoice}} = req.body
  const subscriptionsData = await getSubscriptionsData(invoice)
  if (subscriptionsData.type === statuses.ERROR) {
    return
  }

  const {stripeSubscription, userSubscription} = subscriptionsData
  await stripeSubscription.update({
    statusId: StripeSubscriptionStatus.DISABLE.id
  });

  await userSubscription.update({
    statusId: UserSubscriptionStatus.DISABLE.id
  });
}

const checkoutSessionCompleted = async(req) => {
  const {data: {object: {metadata}}} = req.body
  
  if (!metadata.subscriptionUuid || !metadata.userUuid) {
    return
  }

  const subscription = await Subscription.findOne({
    where: {
      uuid: uuidService.decodeUuid(metadata.subscriptionUuid)
    }
  })

  const user = await User.findOne({
    where: {
      uuid: uuidService.decodeUuid(metadata.userUuid)
    }
  })

  const currentDate = DateTime.now()
  const userSubscription = await UserSubscription.findOne({
    where: {
      userId: user.id,
      subscriptionId: subscription.id,
      statusId: UserSubscriptionStatusValues.ACTIVE.id
    }
  })

  //TOdo : check this, if already subcription user has, then what to do
  // currently i'm ignoring
  if (!userSubscription) {
    await UserSubscription.create({
      userId: user.id,
      subscriptionId: subscription.id,
      statusId: UserSubscriptionStatusValues.ACTIVE.id,
      paymentTypeId: PaymentTypeValues.STRIPE.id,
      lastPaymentDate: currentDate.toISO()
    })
  } else {
    await userSubscription.update({
      statusId: UserSubscriptionStatusValues.ACTIVE.id,
      paymentTypeId: PaymentTypeValues.STRIPE.id,
      lastPaymentDate: currentDate.toISO()
    })
  }

  // const subscriptionsData = await getSubscriptionsData(invoice)
  // if (subscriptionsData.type === statuses.ERROR) {
  //   return
  // }
  // const {stripeSubscription, userSubscription} = subscriptionsData
  // await stripeSubscription.update({
  //   statusId: StripeSubscriptionStatus.ACTIVE.id
  // });

  // await userSubscription.update({
  //   statusId: UserSubscriptionStatus.ACTIVE.id
  // });

  //Create payment log
  const stripePaymentLog = await createStripePaymentLog({
    response: req.body, 
    typeId: StripePaymentLogTypeValues.SUBSCRIPTION.id, 
    statusId: StripePaymentLogStatusValues.SUCCESS.id
  })

  // await stripeSubscription.update({
  //   stripePaymentLogId: stripePaymentLog.id
  // });
}

/*******Webhook******** */
const stripeSubscription = async (req, res) => {
  let data;
  let eventType;
  // // Check if webhook signing is configured.
  // const webhookSecret = process.env.STRIPE_WEBOOK_SECRET
  // if (webhookSecret) {
  //   // Retrieve the event by verifying the signature using the raw body and secret.
  //   const payloadString = JSON.stringify(req.body, null, 2);
  //   console.log("payloadString = ", payloadString)
  //   const header = stripe.webhooks.generateTestHeaderString({
  //     payload: payloadString,
  //     webhookSecret,
  //   });
  //   let event;
  //   let signature = req.headers["stripe-signature"];
  //   console.log("-------signature------", signature)
  //   try {payload
  //     event = stripe.webhooks.constructEvent(
  //       payloadString,
  //       header,
  //       webhookSecret
  //     );
  //   } catch (err) {
  //     console.log("err = ", err)
  //     console.log(`Webhook signature verification failed.`);
  //     return res.sendStatus(400);
  //   }
  //   // Extract the object from the event.
  //   data = event.data;
  //   eventType = event.type;
  // } else {
  //   // Webhook signing is recommended, but if the secret is not configured in `config.js`,
  //   // retrieve the event data directly from the request body.
  //   data = req.body.data;
  //   eventType = req.body.type;
  // }
  data = req.body.data;
  eventType = req.body.type;
  
  switch (eventType) {
      case 'invoice.paid':
        await invoicePaidHandler(req)
        break;
      case 'charge.succeeded':
        await stripeChargeSuccessHandler(req)
        break;
      case 'checkout.session.completed':
        await checkoutSessionCompleted(req)
        break;
      case 'invoice.payment_failed':
        await invoicePaymentFailedHandler(req)
        break;
      default:
      // Unhandled event type
    }

  res.sendStatus(200);
}

module.exports = {
  stripeSubscription
}