const Product = require('../models/productmodel');
const jwt = require('jsonwebtoken');

exports.createProduct = async (req, res) => {
    try {

        console.log("BODY:", req.body);

        const { title, price, image } = req.body;

        await Product.create({
            title,
            price,
            image
        });

        res.json({
            msg: "product saved"
        });

    } catch (error) {

        res.json({
            msg: error.message
        });

    }
};

exports.bulkinsert = async (req, res) => {
    try {

        await Product.insertMany(req.body);

        res.json({
            msg: "products saved"
        });

    } catch (error) {

        res.json({
            msg: error.message
        });

    }
};

exports.getProducts = async (req, res) => {
    try {

        // take token from headers
        let token = req.headers.authorization.split(" ")[1];
        
        let isvalid = jwt.verify(
            token,
            process.env.JWT_SECRET
);

if (!isvalid)
    return res.json({
msg: "invalid token"
    });
        // query parameters
        let maxlimit = req.query.limit;
        let shipment = req.query.location;

        // location from headers
        let currentlocation = req.headers.location;

        let allproducts = await Product.find().limit(maxlimit);

        res.json({
            allproducts,
            address: `from ${shipment}`,
            currentlocation
        });

    } catch (error) {

        res.json({
            msg: error.message
        });

    }
};

exports.updateProduct = async (req, res) => {
    try {

        let productid = req.params.id;

        await Product.findByIdAndUpdate(
            productid,
            req.body
        );

        res.json({
            msg: "product updated"
        });

    } catch (error) {

        res.json({
            msg: error.message
        });

    }
};

exports.deleteProduct = async (req, res) => {
    try {

        let productid = req.params.id;

        await Product.findByIdAndDelete(
            productid
        );

        res.json({
            msg: "product deleted"
        });

    } catch (error) {

        res.json({
            msg: error.message
        });

    }
};