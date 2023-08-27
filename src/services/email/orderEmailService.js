const statuses = require("../../constants/statuses.json")
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const { DateTime } = require("luxon");
const textUtiltiy = require("../../utils/text")
const emailService = require("../emailService")
const uuidService = require("../uuidService")
const orderCheckoutSuccessTranslation = require("../../translations/emails/orderCheckoutSuccessTranslation")

const transporter = emailService.getEmailTransporter()
const SMTP_EMAIL_FROM = emailService.getEmailFrom()

const sendOrderCheckoutSuccessEmail = async(user, order) => {
    if (!user) {
        return {
            type: statuses.ERROR
        }
    }

    let translation = user.locale ? user.locale : "fr"
    let isMailSend = false;
    const to = user.email
    const fileData = fs.readFileSync(path.join(__dirname, "../../views/email/order/checkout.html"), 'utf8');
    const template = handlebars.compile(fileData)
    const replacements = {
        domain: process.env.API_BASE_URL,
        firstName: textUtiltiy.capitalize(user.firstName),
        clientId: uuidService.encodeUuid(user.uuid),
        transactionDate: (DateTime.fromMillis(order.updatedAt.getTime())).toFormat("DDD"),
        taxQst: order.taxQst ?? 0,
        taxPst: order.taxPst ?? 0,
        taxHst: order.taxHst ?? 0,
        taxGst: order.taxGst ?? 0,
        totalAmount: order.totalAmount ?? 0,
        subTotalAmount: order.subTotalAmount ?? 0,
        facebookUrl: "https://www.facebook.com/soins.karisma/",
        instagramUrl: "https://www.instagram.com/soins.karisma/",
        ...orderCheckoutSuccessTranslation[translation]
    }
    const htmlToSend = template(replacements)

    const mailOptions = {
        from: SMTP_EMAIL_FROM,
        to,
        subject: "Order Checkout Success",
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
    sendOrderCheckoutSuccessEmail
}
