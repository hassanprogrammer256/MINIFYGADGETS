const express = require('express');
const cors = require('cors');
const sendingotp = require('./verifyemail');
const sendingfeedback = require('./sendfeedbk');
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

// Endpoint to confirm OTP code
app.post('/confirmcode', (req, res) => {
    const { code, email } = req.body;
    const verification = emailVerifications.find(obj => obj.orderDetails.EMAIL === email);
    
    if (verification) {
        if (verification.OTP === `${code}`) {
            return res.json({ message: 'OTP accepted', emailVerifications });
        } else {
            return res.json({ message: 'OTP is Incorrect', emailVerifications });
        }
    } else {
        return res.json({ message: "No verification found for this email", emailVerifications });
    }
});

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