const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middlewere/authMiddlewere");


//reoute GET / api / admin / products
// desc Get all product (admin only)
// access private /admin

const router = express.Router();

router.get("/", protect, admin, async(req, res) =>{
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"})
    }
});

module.exports = router;