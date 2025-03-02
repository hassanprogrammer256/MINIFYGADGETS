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
      html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your OTP Code</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 500px;
                margin: auto;
                background: white;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .otp {
                font-size: 24px;
                font-weight: bold;
                color: #333;
                text-align: center;
                margin: 20px 0;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 12px;
                color: #888;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Welcome!</h1>
            <p>Your One-Time Password (OTP) is:</p>
            <div class="otp">${otp.password}</div>
            <p>Please enter this code to verify your account. This code is valid for 10 minutes.</p>
            <div class="footer">
                <p>&copy; MINIFY GADGETS</p>
            </div>
        </div>
    </body>
    </html>
    `, 
    })
    
return otp;
  
  }
    catch(e){console.log("UNABLE TO SEND EMAIL");return false}
}

module.exports=sendingotp;