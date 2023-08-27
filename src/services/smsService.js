const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = require('twilio')(accountSid, authToken);
const statuses = require('../constants/statuses.json')

const sendMessage = async(to, text = '') => {
    let isMessageSend = false
    await client.messages
    .create({
        body: text,
        from: phoneNumber,
        to
    })
    .then(message => {
        isMessageSend = true
    })
    .catch(e => {
        isMessageSend = false
    });

    return {
        type: isMessageSend ? statuses.SUCCESS : statuses.ERROR
    }
}

module.exports = {
    sendMessage
}