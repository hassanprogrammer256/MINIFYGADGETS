const nodemailer = require("nodemailer");
require('dotenv').config()

const generateOTP = () => {
  // Generate a random 6 digit number
  const password = Math.floor(1000 + Math.random() * 900000);
  const expiry = Date.now() + 10 * 60 * 1000; 
  let otpData = { password, expiry }; 
return otpData; 
}


    // HTML body with OTP
   
const transporter = nodemailer.createTransport({
service:'gmail',
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: process.env.SENDER,
    pass: process.env.PASSWORD,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendingotp(reciever) {
  const otp = generateOTP();
  try{  // send mail with defined transport object
    const info = await transporter.sendMail({
      from: process.env.SENDER, // sender address
      to: reciever, // list of receivers
      subject: "MINIFY GADGETS", 
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            background-color: #121212; /* Dark background */
            color: #ffffff; /* Light text */
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
        }
        .otp-code {
            font-size: 2em;
            font-weight: bold;
            color: #FFA500; /* Orange color for OTP code */
        }
        .help-link {
            color: #ffffff; /* Light color for the link */
            text-decoration: none;
        }
        .help-link:hover {
            color: #FFC107; /* Amber color on hover */
        }
    </style>
</head>
<body>
    <h1>Your OTP Code</h1>
    <p>We have sent you a One-Time Password (OTP) for verification.</p>
    <p class="otp-code">${otp.password}</p> 
    <p>If you did not request this code, please let us know by visiting our <a href="${process.env.FRONTEND_URL}/#contacts" class="help-link">Help Center</a>.</p>
</body>
</html>`, 
    })
    
return otp;
  
  }
    catch(e){console.log("UNABLE TO SEND EMAIL");return false}
}
module.exports=sendingotp;