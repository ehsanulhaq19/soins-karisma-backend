const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const {stripeChargeSuccessHandler, stripePaymentIntentSuccessHandler} = require("./helpers/stripePaymentWebhookHelper")

/*******Webhook******** */
const stripeSubscription = async (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event = request.body;
    // try {
    //     event = stripe.webhooks.constructEvent(request.body, sig, "we_1MoXeEGv3PJiiBLi4DyAghQU");
    // } catch (err) {
    //     response.status(400).send(`Webhook Error: ${err.message}`);
    //     return;
    // }

    // Handle the event
    switch (event.type) {
        case 'charge.captured':
            const chargeCaptured = event.data.object;
            // Then define and call a function to handle the event charge.captured
        break;
        case 'charge.succeeded':
            const chargeSucceeded = event.data.object;
            await stripeChargeSuccessHandler(chargeSucceeded)
            // Then define and call a function to handle the event charge.succeeded
        break;
        case 'payment_intent.amount_capturable_updated':
            const paymentIntentAmountCapturableUpdated = event.data.object;
            // Then define and call a function to handle the event payment_intent.amount_capturable_updated
        break;
        case 'payment_intent.succeeded':
            await stripePaymentIntentSuccessHandler(event.data.object)
            // Then define and call a function to handle the event payment_intent.succeeded
        break;
            // ... handle other event types
        default:
    }
    
    // Return a 200 response to acknowledge receipt of the event
    response.json({received: true});
}

module.exports = {
    stripeSubscription
}