const nodemailer = require("nodemailer");
require('dotenv').config()

function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function addTenMinutes() {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 10); // Add 10 minutes
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}


const generateOTP = () => {
  // Generate a random 6 digit number
  const password = Math.floor(100000 + Math.random() * 900000);
  const expiry = addTenMinutes() 
  const sent = getCurrentTime()
  let otpData = { password, expiry,sent }; 
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
async function sendingotp(reciever,name) {
  const otp = generateOTP();
  try{  // send mail with defined transport object
    const info = await transporter.sendMail({
      from: process.env.SENDER, // sender address
      to: reciever, // list of receivers
      subject: "[MINIFY GADGETS] Please verify your email", 
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
    <h1> HI ${name}</h1>
  <p> In order to successfully make an order, An order attempt requires further verification because we did not recognize your email. To complete the ordering, enter the verification code to verify email</p>

    <p class="otp-code">${otp.password}</p> 

    <p>You can also continue  exploring our <a href= 'https://minifygadgets.netlify.app/'>MINIFY GADGETS</a> website for the best gadgets Ever</p>
     <p>If you did not attempt to make an order with us, your email may be compromised. Visit <a href='https://accounts.google.com/v3/signin/recoveryidentifier?flowName=GlifWebSignIn&dsh=S-753977921%3A1741336520494551&ddm=1'>Google Account Recovery</a> for securing your email. or 
visit our <a href="${process.env.FRONTEND_URL}/#contacts" class="help-link">Help Center</a>.</p>

Thanks,
The Minfy Gadgets Team
</body>
</html>`, 
    })
    
return otp;
  
  }
    catch(e){;return false}
}
module.exports=sendingotp;

