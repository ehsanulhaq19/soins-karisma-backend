const nodemailer = require("nodemailer");
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const statuses = require("../constants/statuses.json");
const textUtiltiy = require("../utils/text")

const SMTP_EMAIL = process.env.SMTP_EMAIL
const SMTP_PASSWORD = process.env.SMTP_PASSWORD
const SMTP_SERVICE = process.env.SMTP_SERVICE
const SMTP_EMAIL_FROM = process.env.SMTP_EMAIL_FROM

const transporter = nodemailer.createTransport({
    service: SMTP_SERVICE,
    auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
    },
});

const getEmailTransporter = () => {
    return transporter
}

const getEmailFrom = () => {
    return SMTP_EMAIL_FROM
}

const sendForgotPasswordEmail = async(user, otpCode) => {
    if (!user || !otpCode) {
        return {
            type: statuses.ERROR
        }
    }

    let isMailSend = false;
    const to = user.email
    const fileData = fs.readFileSync(path.join(__dirname, "../views/email/auth/forgotPassword.html"), 'utf8');
    const template = handlebars.compile(fileData)

    const replacements = {
        domain: process.env.API_BASE_URL,
        passwordResetLink: `${process.env.FRONTEND_APP_DOMAIN}/otp-verify`,
        otpCode
    }
    const htmlToSend = template(replacements)

    const mailOptions = {
        from: SMTP_EMAIL_FROM,
        to,
        subject: "Forgot Password",
        html: htmlToSend,
    };

    const emailPromise = new Promise(function(resolve) {
        transporter.sendMail(mailOptions, function (error, info) {
            let emailStatus = false;
            if (error) {
                console.log(error);
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

const sendRegisterEmail = async(user) => {
    if (!user) {
        return {
            type: statuses.ERROR
        }
    }

    let isMailSend = false;
    const to = user.email
    const fileData = fs.readFileSync(path.join(__dirname, "../views/email/auth/register.html"), 'utf8');
    const template = handlebars.compile(fileData)
    const replacements = {
        domain: process.env.API_BASE_URL,
        name: textUtiltiy.capitalize(user.firstName),
        loginLink: `${process.env.FRONTEND_APP_DOMAIN}/customer/login`,
    }
    const htmlToSend = template(replacements)

    const mailOptions = {
        from: SMTP_EMAIL_FROM,
        to,
        subject: "Registraion",
        html: htmlToSend,
    };

    const emailPromise = new Promise(function(resolve) {
        transporter.sendMail(mailOptions, function (error, info) {
            let emailStatus = false;
            if (error) {
                console.log(error);
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

const sendSalonRegisterEmail = async(user, userPassword) => {
    if (!user) {
        return {
            type: statuses.ERROR
        }
    }

    let isMailSend = false;
    const to = user.email
    const fileData = fs.readFileSync(path.join(__dirname, "../views/email/auth/salonRegister.html"), 'utf8');
    const template = handlebars.compile(fileData)
    const replacements = {
        domain: process.env.API_BASE_URL,
        firstName: textUtiltiy.capitalize(user.firstName),
        userName: user.userName,
        password: userPassword,
        loginLink: `${process.env.FRONTEND_APP_DOMAIN}/salon/login`,
    }
    const htmlToSend = template(replacements)

    const mailOptions = {
        from: SMTP_EMAIL_FROM,
        to,
        subject: "Salon Registraion",
        html: htmlToSend,
    };

    const emailPromise = new Promise(function(resolve) {
        transporter.sendMail(mailOptions, function (error, info) {
            let emailStatus = false;
            if (error) {
                console.log(error);
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

const sendTwoFactorAuthEmail = async(user, otpCode) => {
    if (!user || !otpCode) {
        return {
            type: statuses.ERROR
        }
    }

    let isMailSend = false;
    const to = user.email
    const mailOptions = {
        from: SMTP_EMAIL_FROM,
        to,
        subject: "Two Factor Authentication",
        html: `<p>Your Two Factor Authentication OTP Code is ${otpCode}. Code will expire in 30 minutes.</p>`,
    };

    const emailPromise = new Promise(function(resolve) {
        transporter.sendMail(mailOptions, function (error, info) {
            let emailStatus = false;
            if (error) {
                console.log(error);
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
    getEmailTransporter,
    getEmailFrom,
    sendForgotPasswordEmail,
    sendRegisterEmail,
    sendTwoFactorAuthEmail,
    sendSalonRegisterEmail
}