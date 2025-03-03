const nodemailer = require("nodemailer");

const FRONTEND_URL = process.env.FRONTEND_URL
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
    <title>Minify||Gadgets</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #f3f4f6;padding:15px
         
        }
        .container {
            max-width: 600px;
            margin: auto;
        }
            .heading{color: #581c87,font-weight: bolder; text-align:center}
            .mini-body{background-color: #0f172a;}
            .otp{color: #f59e0b,font-weight: bold,text-align:center;font-size:26px}
            .otp-box{display:flex;flex-direction: column;align-items: center;justify-content: center}
    </style>
</head>
<body>
    <div class="container mx-auto p-6 bg-slate-900shadow-md rounded-lg mt-10 mini-body">
        <div class="text-center">
            <h1 class="text-3xl font-bold text-purple-900 heading">MINIFY GADGETS</h1>
        </div>
        
        <div class="mt-8 text-center otp-box">
            <p class="text-lg :text-gray-200">Your OTP code is:</p>
            <span class="text-4xl font-extrabold otp">${otp.password}</span> 
        </div>

        <div class="mt-10 text-center">
            <p class="text-sm text-gray-600 dark:text-gray-300">
                If you did not request this code, please ignore this message.
                You can visit our <a href=${FRONTEND_URL}/#contacts" class="text-blue-600 underline">Help Center</a> for more information.
            </p>
        </div>

        <div class="mt-4 text-center">
            <p class="text-sm text-gray-600 dark:text-gray-300">
                © Minify Gadgets. All Rights Reserved.
            </p>
        </div>
    </div>
</body>
</html>`, 
    })
    
return otp;
  
  }
    catch(e){console.log("UNABLE TO SEND EMAIL");return false}
}

module.exports=sendingotp;