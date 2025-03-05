const express = require('express');
const cors = require('cors');
const Dummy = require('./data.json')
const mongoose = require('mongoose');
const sendingotp = require('./verifyemail')
const sendingfeedback = require('./sendfeedbk')
const otp = require('./verifyemail')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3000
app.use(express.json());
app.use(cors({origin:process.env.FRONTEND_URL,methods:['POST','GET'],credentials:true}))

let emailVerifications = [{
  "NAME": 'HASSAN',
  "PHONE NUMBER": '0740297633',
  "EMAIL": 'hassanprogrammer256@gmail.com',
  "LOCATION": 'Kibuli',
  "PAYMENT METHOD": 'Cash On Delivery',
  "OTP": '27432',
  "EXPIRES": (Date.now()-Date.now()).toString() // assuming result.expiry is a timestamp
},
{
  "NAME": "HASSAN",
  "PHONE NUMBER": "0740297633",
  "EMAIL": "hassanprogrammer256@gmail.com",
  "LOCATION": "Kibuli",
  "PAYMENT METHOD": "cash",
  "OTP": 297590,
  "EXPIRES": "01:49:39"
}
];
const Database = 'MINIFY_DATABASE';
const Collection_1 ='Categories';
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

  // Find the verification entry for the provided email
const verification = emailVerifications.find(obj => obj.EMAIL === email);
  console.log(verification)
  if (verification) {
      // Check if the code matches and is still valid
      if (verification.OTP === code) {
          if (verification.EXPIRES >= Date.now()) {
              // OTP accepted
              res.json({ message: "OTP is accepted" });
          } else {
              // OTP expired
              res.json({ message: "Code expired" });
          }
      } else {
          // Incorrect OTP
          res.json({ message: "Incorrect OTP" });
      }
  } else {
      // No verification found for the provided email
      res.json({ message: "No verification found for this email" });
  }
});

app.post('/submitorder', (req, res) => {
  const { name, number, email, location, paymentMethod, CustomerOrder } = req.body;

  const orderDetails = {
      "NAME": name,
      "PHONE NUMBER": number,
      "EMAIL": email,
      "LOCATION": location,
      "PAYMENT METHOD": paymentMethod,
      "CUSTOMER ORDER": CustomerOrder
  };

  sendingotp(email).then(result => {
   if (sendingotp){
    const otpInfo = {
      "NAME": name,
      "PHONE NUMBER": number,
      "EMAIL": email,
      "LOCATION": location,
      "PAYMENT METHOD": paymentMethod,
      "OTP": result.password,
      "EXPIRES": result.expiry // assuming result.expiry is a timestamp
  };
  emailVerifications.push(otpInfo)
  res.json({message: 'sent',data: emailVerifications})
   }else{
    res.json({message: 'not sent'})
   }

      // Store the OTP information in the emailVerifications array
      emailVerifications.push(otpInfo);

      // Respond with the order details and OTP (but not the OTP value for security reasons)
      res.json({
          message: "OTP sent",
          orderDetails: orderDetails
      });
  }).catch(err => {
      console.error("Error sending OTP:", err);
      res.status(500).json({ message: "Error sending OTP" });
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
