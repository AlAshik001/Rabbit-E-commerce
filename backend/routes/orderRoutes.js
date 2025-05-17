const express = require("express");
const Order =require("../models/Order");
const {protect} = require("../middlewere/authMiddlewere");

const router = express.Router();

// @route GET/api/orders/my-orders
// @desc get loggedin user's orders
// @ access private 

router.get("/my-orders", protect, async (req, res)=>{
    try {
        // find orders for the authenticated user
        const orders = await Order.find({user: req.user._id}).sort({
            createAt: -1,
        }); // sort by most recent orders
        console.log("orders", orders)
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
});

//@route GEt /api/orders/:id
//@desc GET order details by ID 
//@access private
router.get("/:id", protect, async (req, res)=> {
    try {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        );

        if(!order){
            return res.status(404).json({message: "Order not found"});
        }

        // return the full order details
        res.json(order);
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Server Error"});
    }
})

module.exports = router;