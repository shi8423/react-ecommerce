require('dotenv').config();

const express = require('express');
const cors = require('cors');
let connection = require('./config/db');
const limiter = require('./middleware/ratelimit');
let productRoutes = require('./routes/productRoutes');
let authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT;

// middleware
app.use(express.json());
app.use(cors());
app.use(limiter);

// routes
app.use('/products', productRoutes);
app.use('/auth', authRoutes);



exports.bulkinsert = async (req, res) => {
    try {

        console.log(req.body);

        await Product.insertMany(req.body);

        res.json({
            msg: "products saved"
        });

    } catch (error) {

        res.json({
            msg: error.message
        });

    }
}

// SERVER
app.listen(port, () => {
    console.log(`the server is running on ${port}`);
    connection();
});
