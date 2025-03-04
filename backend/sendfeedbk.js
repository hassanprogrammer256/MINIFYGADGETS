const nodemailer = require("nodemailer");
require('dotenv').config()
   
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
async function sendingfeedback(sender,subject,message,name,phonenumber) {
  try{  // send mail with defined transport object
    const info = await transporter.sendMail({
      from: sender, // sender address
      to: process.env.LAUBEN_EMAIL, // list of receivers
      subject:'CUSTOMER FEEDBACK', 
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minify||Gadgets</title>
    <style>
        body {
            background-color: #121212; /* Dark background */
            color: #ffffff; /* Light text */
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
        }
        h1 {
            font-size: 2em;
            font-weight: bold;
            color: #FFA500; /* Orange color for OTP code */
        }
            .flex{display: flex;}
            .text-black{color: #000000}
            .font-black{font-weight:600}
            .text-blue{color: #0000FF}
    </style>
</head>
<body>
    <h1>${subject}</h1>
    <p>${message}</p> 
    
    <h4>sender:</<h4><span class = 'text-black font-black'>${name}</span>
    <h4>email:</<h4><span class = 'text-blue font-black'>${sender}</span>
    <h4>phone number:</<h4><span class = 'text-black font-black'>${phonenumber}</span>
</body>
</html>`, 
    })
    
  
  }
    catch(e){console.log("UNABLE TO SEND EMAIL");return false}
}
module.exports=sendingfeedback;