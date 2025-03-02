const express = require('express');
const cors = require('cors');
const Dummy = require('./Dummy')
const mongoose = require('mongoose');
const sendingotp = require('./verifyemail')
const otp = require('./verifyemail')
const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json());
app.use(cors({
  origin: 'https://minifygadgets.netlify.app',
  methods:['GET','POST'] // Adjust this according to your frontend origin
}));
// app.use(cors({origin:'https://localhost:5173',methods:['POST','GET'],credentials:true}))
let emailVerifications = [];

const Database = 'MINIFY_DATABASE';
const Collection_1 ='Categories';
const Collection_2 ='Products';
// test server = https://minifyserver.onrender.com/getdummy

const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const uri = "mongodb+srv://MINIFY_GADGETS:Hommie256@minifygadgets.8gpiu.mongodb.net/?retryWrites=true&w=majority&appName=MINIFYGADGETS";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,}
});


async function main() {
  // Connect to the MongoDB client
  await client.connect();
  console.log('Connected to MongoDB');
  const db = client.db(Database);
  const Categories_Collection = db.collection(Collection_1);
  const Product_Collection = db.collection(Collection_2);

  //  ================CATEGORIES===================

  //2-get all categories
  app.get('/allcategories', async (req, res) => {
    const all_Categories = await Categories_Collection.find({}).toArray();
    // const categories = all_Categories.map(l => l.name);
    res.json(all_Categories.slice(0,10))
  });

  // Find Data by ID
  app.get('/get_pdt_id/:id', async (req, res) => {
    const id = req.params.id;
    const data = await collection.findOne({ _id: new ObjectId(id) });
    if (!data) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json(data);
  });

  // Update All Data
  app.put('/data', async (req, res) => {
    const updateData = req.body;
    const result = await collection.updateMany({}, { $set: updateData });
    res.json({ updatedCount: result.modifiedCount });
  });

  // Update Data by ID
  app.patch('/change_pdt_id/:id', async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json({ modifiedCount: result.modifiedCount });
  });

  // Delete All Data
  app.delete('/data', async (req, res) => {
    const result = await collection.deleteMany({});
    res.json({ deletedCount: result.deletedCount });
  });

  // Delete Data by ID
  app.delete('/data/:id', async (req, res) => {
    const id = req.params.id;
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json({ message: 'Deleted successfully' });
  })

app.post('/feedback', (req, res) => {
  const { name, phonenumber, email, subject,message } = req.body;

  const CustomerFeedback = {
      "NAME": name,
      "PHONE NUMBER": phonenumber,
      "EMAIL": email,
      "SUBJECT": subject,
      "MESSAGE": message};
if(name.toLower()==="hassan"){res.json({message: 'sent'})}else{res.json({message: 'not sent'})}

   });

app.post('/confirmcode', (req, res) => {
  const { code, email } = req.body;

  // Find the verification entry for the provided email
  const verification = emailVerifications.find(obj => obj.EMAIL === email);
  
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
  // else{
  //   if ( verification.EXPIRES < Date.now()){
  //     emailverifications = emailverifications.filter(obj => obj.EMAIL!== email)
  //     res.json({message: "OTP expired"})
  //     return 0;
  //   }
  //   res.json({message: "Invalid OTP"})
  // }
}
app.get('/',(req,res) => {

res.send("WELCOME TO MINIFY GADGETS SERVER")
})


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
  res.json({message: 'sent'})
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

app.get('/getdummy',(req,res) => {
  const data = [];
const response = Dummy.default.products

res.send(response)
})

main().catch(console.error);

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT || PORT}`)
})
