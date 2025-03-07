const express = require('express');
const cors = require('cors');
const Dummy = require('./data.json')
const mongoose = require('mongoose');
const sendingotp = require('./verifyemail')
const sendingfeedback = require('./sendfeedbk')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3000
app.use(express.json());
app.use(cors({origin:process.env.FRONTEND_URL,methods:['POST','GET'],credentials:true}))


function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

let emailVerifications = [];

const Database = 'MINIFY_DATABASE';
const Collection_1 ='Customer_Orders';
const Collection_2 ='Products';

const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const uri = "mongodb+srv://MINIFY_GADGETS:Hommie256@minifygadgets.8gpiu.mongodb.net/?retryWrites=true&w=majority&appName=MINIFYGADGETS";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,}
});

app.get('/',(req,res) => {

res.send("WELCOME TO MINIFY GADGETS SERVER")
})

app.post('/confirmcode', (req, res) => {
  const { code, email } = req.body;
  const verification = emailVerifications.find(obj => obj.orderDetails.EMAIL == email);
  if (verification) {
      // Check if the code matches and if it's still valid (add expiration check if required)
      if (verification.OTP == `${code}`) {
          return res.json({ message: 'OTP accepted',emailVerifications});

      } else {
          // Incorrect OTP
          return res.json({ message: 'OTP is Incorrect',emailVerifications});
      }
  } else {
      // No verification found for the provided email
      return res.json({ message: "No verification found for this email" });
  }
});

app.post('/submitorder', async(req, res) => {
  const { name, number, email, location, paymentMethod, CustomerOrder } = req.body;
await client.connect();
const db = client.db(Database);
const collection = db.collection(Collection_1);
  const orderDetails = {
    "NAME": name,
    "PHONE NUMBER": number,
    "EMAIL": email,
    "LOCATION": location,
    "PAYMENT METHOD": paymentMethod,
    "CUSTOMER ORDER": CustomerOrder
  };

 sendingotp(email,name).then(result => {
    // Ensure `otpInfo` is defined regardless of sendingotp result
    let otpInfo = null;
    if (result) {
      otpInfo = {
        orderDetails,
        "OTP": result.password,
        "SENT": result.sent,
        "EXPIRES": result.expiry }

      // Store the OTP information in the emailVerifications array
      emailVerifications.push(otpInfo);
      // Respond with the order details and OTP (but not the OTP value for security reasons)
      return res.json({
        message: "OTP sent",
        orderDetails: orderDetails,
        data: emailVerifications,
      });
    } else {
      return res.json({ message: 'OTP not sent'});
    }
  }).catch(err => {
    console.error("Error sending OTP:", err);
    return res.json({ message: "Error sending OTP" });
  });
});

app.post('/sendfeedback', (req, res) => {
  const { name, phonenumber, email, subject,message } = req.body;

if(name !=="" && phonenumber !=="" && email !== "" && subject !== "" && message !== ""){
 sendingfeedback(email, subject, message,name,phonenumber).then(result => {
  res.json({message: 'Feedback sent successfully'})
 })
  }else{res.json({message: 'not sent'})}

   });

app.post('/search', async (req, res) => {
  const searchValue = req.body.q; // Retrieve the search term from the request body

  if (!searchValue) {
      return res.status(400).json({ error: 'Search value is required' });
  }

  try {
      await client.connect();
      const database = client.db(Database);
      
      const collection = database.collection(Collection_1);

      const query = { name: { $regex: searchValue, $options: 'i' } }; // Match the search term in the 'name' field
      const results = await collection.find(query).toArray();
      res.json(results);
  } catch (error) {
      console.error('Error occurred while searching:', error);
      res.status(500).json({ error: 'Internal server error' });
  } finally{await client.close()}
});

app.post('/allproducts', async(req,res) => {
  const val = req.body.q
  if (!val) {
    return res.status(400).json({ error: 'Search value is required' });
}

try {

    res.json(Dummy.filter(d =>d.category === val));
} catch (error) {
    console.error('Error occurred while searching:', error);
    res.status(500).json({ error: 'Internal server error' });
}

})


app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT || PORT}`)
})
