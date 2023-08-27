const statuses = require("../../constants/statuses.json")
const { DateTime } = require("luxon");
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const textUtiltiy = require("../../utils/text")
const emailService = require("../emailService")
const uuidService = require("../uuidService")
const subscriptionDurationValues = require("../../models/values/SubscriptionDurations")
const subcscriptionCheckoutSuccessTranslation = require("../../translations/emails/subscriptionCheckoutSuccess")
const transporter = emailService.getEmailTransporter()
const SMTP_EMAIL_FROM = emailService.getEmailFrom()

const sendSubscriptionCheckoutSuccessEmail = async(user, userSubscription) => {
    if (!user) {
        return {
            type: statuses.ERROR
        }
    }
    const subscription = userSubscription.Subscription
    const subscriptionDuration = subscription.SubscriptionDuration
    
    let translation = user.locale ? user.locale : "fr"
    let isMailSend = false;
    const to = user.email
    const fileData = fs.readFileSync(path.join(__dirname, "../../views/email/subscription/checkout.html"), 'utf8');
    const template = handlebars.compile(fileData)

    const startDate = DateTime.now()
    let endDate = null
    if (subscriptionDuration.id == subscriptionDurationValues.DAY.id) {
        endDate = startDate.plus({days:1});
    } else if (subscriptionDuration.id == subscriptionDurationValues.MONTH.id) {
        endDate = startDate.plus({months:1});
    } else if (subscriptionDuration.id == subscriptionDurationValues.WEEK.id) {
        endDate = startDate.plus({weeks:1});
    } else if (subscriptionDuration.id == subscriptionDurationValues.YEAR.id) {
        endDate = startDate.plus({years:1});
    }
    
    const replacements = {
        domain: process.env.API_BASE_URL,
        firstName: textUtiltiy.capitalize(user.firstName),
        clientId: uuidService.encodeUuid(user.uuid),
        transactionDate: (DateTime.fromMillis(userSubscription.lastPaymentDate.getTime())).toFormat("DDD"),
        taxQst: userSubscription.taxQst ?? 0,
        taxPst: userSubscription.taxPst ?? 0,
        taxHst: userSubscription.taxHst ?? 0,
        taxGst: userSubscription.taxGst ?? 0,
        totalAmount: userSubscription.totalAmount ?? 0,
        subTotalAmount: userSubscription.subTotalAmount ?? 0,
        subscriptionType: subscriptionDuration.name,
        startDate: startDate.startOf('day').toFormat('dd-LL-yyyy'),
        endDate: endDate.startOf('day').toFormat('dd-LL-yyyy'),
        facebookUrl: "https://www.facebook.com/soins.karisma/",
        instagramUrl: "https://www.instagram.com/soins.karisma/",
        ...subcscriptionCheckoutSuccessTranslation[translation]
    }
    const htmlToSend = template(replacements)

    const mailOptions = {
        from: SMTP_EMAIL_FROM,
        to,
        subject: "Subscription Checkout Success",
        html: htmlToSend,
    };
    
    const emailPromise = new Promise(function(resolve) {
        transporter.sendMail(mailOptions, function (error, info) {
            let emailStatus = false;
            if (error) {
                emailStatus = false;
            } else {
                emailStatus = true;
            }

            resolve({
                emailStatus
            });
        });
    });
        
    await emailPromise.then(response => {
        isMailSend = response.emailStatus
    })

    return {
        type: isMailSend ? statuses.SUCCESS : statuses.ERROR
    }
}

module.exports = {
    sendSubscriptionCheckoutSuccessEmail
}
