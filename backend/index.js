const express = require('express');
const cors = require('cors');
const sendingotp = require('./verifyemail');
const sendingfeedback = require('./sendfeedbk');
const sendingOrder = require('./SendOrder.jsx');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL, methods: ['POST', 'GET'], credentials: true }));

let emailVerifications = [];
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://MINIFY_GADGETS:Hommie256@minifygadgets.8gpiu.mongodb.net/?retryWrites=true&w=majority&appName=MINIFYGADGETS";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
}

// Basic welcome endpoint
app.get('/', (req, res) => {
    res.send("WELCOME TO MINIFY GADGETS SERVER");
});

app.post('/forwardorder',(req,res) => {
// const {code} = req.body
res.send('HELLO')
// let verification = emailVerifications.find(obj => obj.OTP === code);
// if (verification){
//     try {
// let forwardingOrder = sendingOrder();
// if (forwardingOrder){
//     res.send("sent")
// }else{res.send("failed")}


//     } catch (error) {
//       console.log(error)  
//     }
// }




// 
}
)

// =======================USER=======================

app.post('/submitorder',(req,res) => {
    const { name, number, email, customerLocation, paymentMethod, CustomerOrder } = req.body;

    if (name == '' || email == '' || customerLocation == '' || paymentMethod == ''|| number == ''){
        res.json({error:'Please fill all the required form feilds','DATA':req.body})}else{
            sendingotp(email,name).then(result => {
                if (result){
                  emailVerifications.push({'CUSTOMER': req.body,'OTP':result.password,'SENT':result.sent,'EXPIRES': result.expiry})
                  res.json({message:'OTP SENT',emailVerifications})
                }else{
                    res.json({message:'OTP NOT SENT',emailVerifications})
                }
            })
        }
})
// Endpoint to confirm OTP code
app.post('/confirmcode', (req, res) => {
    const { code, customeremail } = req.body;

    try {
        // Step 1: Find the verification object based on the customer email
        const verification = emailVerifications.find(obj => obj.CUSTOMER.email === customeremail);

        // Step 2: Check if a verification object was found
        if (!verification) {
            return res.json({
                message: "No verification found for this email",
                emailVerifications // Optionally return the current state of emailVerifications
            });
        }

        // Step 3: Check if the OTP has expired
        const currentTime = Date.now();
        if (currentTime > verification.expiry) {
            return res.json({
                message: 'OTP EXPIRED',
                emailVerifications // Optionally return the current state of emailVerifications
            });
        }

        // Step 4: Convert both the provided code and the stored OTP to strings for comparison
        const storedOTP = verification.OTP.toString(); // Convert stored OTP to string
        const inputCode = code.toString(); // Convert input code to string

        // Step 5: Compare the values without considering type
        if (inputCode === storedOTP) {
            return res.json({
                message: 'OTP accepted',
                emailVerifications // Optionally return the current state of emailVerifications
            });
        } else {
            return res.json({
                message: 'OTP is incorrect',
                emailVerifications // Optionally return the current state of emailVerifications
            });
        }
    } catch (error) {
        console.error("ERROR: ", error); // Error is logged for debugging
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
});
// ======================PRODUCT=========================

// Function to handle product routes
async function setupProductRoutes(productsCollection) {
    // Endpoint to add a new product
    app.post('/products', async (req, res) => {
        const newProduct = req.body;
        try {
            const result = await productsCollection.insertOne(newProduct);
            res.status(201).json({ message: 'Product added', productId: result.insertedId });
        } catch (error) {
            console.error('Error adding product:', error);
            res.status(500).json({ error: 'Failed to add product' });
        }
    });

    // Endpoint to add multiple new products
    app.post('/manyproducts', async (req, res) => {
        const newProducts = req.body;
        if (!Array.isArray(newProducts) || newProducts.length === 0) {
            return res.status(400).json({ error: 'Invalid input, expected an array of products.' });
        }
        try {
            const result = await productsCollection.insertMany(newProducts);
            res.status(201).json({ message: 'Products added', productIds: result.insertedIds });
        } catch (error) {
            console.error('Error adding products:', error);
            res.status(500).json({ error: 'Failed to add products' });
        }
    });

    // Endpoint to search products
    app.post('/search', async (req, res) => {
        const searchValue = req.body.q;
        if (!searchValue) {
            return res.status(400).json({ error: 'Search value is required' });
        }
        try {
            const query = { category: { "$regex": searchValue, $options: 'i' } }; 
            const results = await productsCollection.find(query).toArray();
            res.json(results);
        } catch (error) {
            console.error('Error occurred while searching:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // Endpoint to get a product by ID
    app.get('/products/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const product = await productsCollection.findOne({ _id: new ObjectId(id) });
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            console.error('Error fetching product:', error);
            res.status(500).json({ error: 'Failed to fetch product' });
        }
    });

    // Endpoint to update a product by ID
    app.put('/products/:id', async (req, res) => {
        const { id } = req.params;
        const updatedContent = req.body;
        try {
            const updateResult = await productsCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updatedContent }
            );
            if (updateResult.modifiedCount === 1) {
                res.json({ message: 'Product updated' });
            } else {
                res.status(404).json({ message: 'Product not found or nothing to update' });
            }
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json({ error: 'Failed to update product' });
        }
    });

    // Endpoint to delete a product by ID
    app.delete('/products/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const deleteResult = await productsCollection.deleteOne({ _id: new ObjectId(id) });
            if (deleteResult.deletedCount === 1) {
                res.json({ message: 'Product deleted' });
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({ error: 'Failed to delete product' });
        }
    });

    // Endpoint to delete all products
    app.delete('/products', async (req, res) => {
        try {
            const deleteResult = await productsCollection.deleteMany({});
            res.json({ message: `${deleteResult.deletedCount} products deleted` });
        } catch (error) {
            console.error('Error deleting products:', error);
            res.status(500).json({ error: 'Failed to delete products' });
        }
    });

    // Endpoint to get all products
    app.get('/allproducts', async (req, res) => {
        try {
            const results = await productsCollection.find({}).toArray();
            res.json(results);
        } catch (error) {
            console.error('Error occurred while fetching products:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
}

(async () => {
    await connectToDatabase();
    const db = client.db('MINIFY_DATABASE');
    const productsCollection = db.collection('Products');
    
    setupProductRoutes(productsCollection);

    // Start the server
    app.listen(PORT, () => {
        console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
    });
})();