require('dotenv').config();
const express = require('express');
const twilio = require('twilio');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Simple in-memory store (in a production app, use a database)
const otpStore = {};

app.post('/send-otp', async (req, res) => {
    const { phoneNumber } = req.body;

    // Generate a random OTP (6 digits)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Save OTP in memory store (you may want to add a timestamp for expiration)
    otpStore[phoneNumber] = otp;

    // Send OTP via SMS
    try {
        await twilioClient.messages.create({
            body: `Your OTP is ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber
        });
        res.status(200).send('OTP sent successfully');
    } catch (error) {
        res.status(500).send('Failed to send OTP: ' + error.message);
    }
});

app.post('/verify-otp', (req, res) => {
    const { phoneNumber, otp } = req.body;

    if (otpStore[phoneNumber] && otpStore[phoneNumber] === otp) {
        delete otpStore[phoneNumber]; // Invalidate the OTP after verification
        res.status(200).send('OTP verified successfully');
    } else {
        res.status(400).send('Invalid OTP');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});