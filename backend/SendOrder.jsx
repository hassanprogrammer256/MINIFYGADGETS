const nodemailer = require("nodemailer");
require('dotenv').config()

function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  function formatDate() {
    // Create a new Date object for the current date
    const today = new Date();

    // Define options for formatting
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
    // Format the date
    const dayFormatter = new Intl.DateTimeFormat('en-US', options);

    // Create an array of the parts of the date
    const parts = dayFormatter.formatToParts(today);

    // Extracting individual parts
    const dayOfWeek = parts.find(part => part.type === 'weekday').value;
    const dayNumber = parts.find(part => part.type === 'day').value;
    const monthName = parts.find(part => part.type === 'month').value;
    const yearNumber = parts.find(part => part.type === 'year').value;

    // Add suffix to the day number
    const daySuffix = (dayNumber) => {
        const lastDigit = dayNumber % 10;
        const lastTwoDigits = dayNumber % 100;

        if (lastDigit === 1 && lastTwoDigits !== 11) {
            return dayNumber + 'st';
        } else if (lastDigit === 2 && lastTwoDigits !== 12) {
            return dayNumber + 'nd';
        } else if (lastDigit === 3 && lastTwoDigits !== 13) {
            return dayNumber + 'rd';
        } else {
            return dayNumber + 'th';
        }
    };

    // Construct the final formatted string
    const formattedDate = `${dayOfWeek} - ${daySuffix(Number(dayNumber))}-${monthName}-${yearNumber}`;
    return formattedDate;
}


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
async function sendingOrder() {
  try{

    // const CalculatedtotalPrice = order.reduce((total, product) => total + product.TotalAmount);

    // Generate dynamic products HTML
   


    const info = await transporter.sendMail({
      from: process.env.SENDER,
      to: process.env.LAUBEN_EMAIL, // list of receivers
      subject:'AN ORDER ALERT', 
      html: `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minify||Gadgets</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
            color: #333;
        }
        
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        
        h1 {
            color: #d9534f;
        }

        h2 {
            color: #5bc0de;
        }

        .order-details {
            margin: 20px 0;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            padding: 10px 0;
        }
        
        .product {
            display: flex;
            padding: 10px 0;
            border-bottom: 1px solid #ddd;
        }
        
        .product img {
            max-width: 100px;
            margin-right: 20px;
        }

        .product-info {
            flex-grow: 1;
        }

        .total-price {
            font-size: 18px;
            font-weight: bold;
            color: #d9534f;
        }

        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>URGENT: Order Confirmation</h1>
        <p>Dear Admin,</p>
        <p>You have received an urgent order that requires your immediate attention.</p>
        
        <h2>Customer Details</h2>
        <p><strong>Name:</strong> {Customer.name}</p>
        <p><strong>Location:</strong>{Customer.customerLocation}</p>
        <p><strong>Email:</strong> {Customer.email}</p>
        <p><strong>Phone Number:</strong> {Customer.number}</p>
        <p><strong>Order Date:</strong> ${formatDate()}</p>
        <p><strong>Order Time:</strong> ${getCurrentTime()}</p>
        
        
        <div class="order-details">
            <h2>Order Details</h2>
            {productsHtml}
            <p class="total-price">Total Price: {CalculatedtotalPrice}</p>
        </div>
        
        <p>If you have any questions regarding this order, please contact the customer directly or reach out to your support team.</p>
        
        <div class="footer">
            <p>Best regards,<br>Your Company</p>
        </div>
    </div>
</body>

</html>`, 
    })
    console.log('ODER SENT SUCCESSFULL')
  return true
  }
    catch(e){console.log("UNABLE TO SEND EMAIL");return false}
}
module.exports=sendingOrder;