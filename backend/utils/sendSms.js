const client = require("../config/twillio");
require("dotenv").config();

const sendSms = async (sentTo, msgTemplate) => {
    try {
        console.log("sentTo : ",sentTo);
        const message = await client.messages.create({
            body: msgTemplate,
            to: sentTo,
            from: process.env.TWILIO_PHONE_NUMBER
        });
        console.log("message : ",message);
        return message;
    } catch (error) {
        console.error("Error in sendSms:", error.message);
        throw error;
    }
};

module.exports = sendSms;