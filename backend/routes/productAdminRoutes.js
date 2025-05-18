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

// @route POST /api/products
// @desc Create a new product
// @access Private/Admin

router.post("/",protect, admin, async (req, res) =>{
    try{
        const {
          name, 
          description, 
          price, 
          discountPrice, 
          countInStock, 
          category,
          brand,
          sizes,
          colors,
          collections,
          material,
          gender,
          images,
          isFeatured,
          isPublished,
          tags,
          dimensions,
          weight,
          sku,

         } = req.body

         const product = new Product(
            {
                name, 
                description, 
                price, 
                discountPrice, 
                countInStock, 
                category,
                brand,
                sizes,
                colors,
                collections,
                material,
                gender,
                images,
                isFeatured,
                isPublished,
                tags,
                dimensions,
                weight,
                sku,
                user: req.user._id, //Referance to the admin user who create it
               });
               
               const createdProduct = await product.save();
               res.status(201).json(createdProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error")
    }
});

// @ Route PUT / api/products/:id
// @desc update an exissting product ID
// @Access Privite/ Admin

router.put("/:id", protect, admin, async (req, res) =>{
    try{
        const {
            name, 
            description, 
            price, 
            discountPrice, 
            countInStock, 
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
  
           } = req.body

        //    Find product by ID
        const product =await Product.findById(req.params.id);

        if(product) {
            // Update product fields
            product.name = name || product.name
            product.description = description || product.description
            product.price = price || product.price
            product.discountPrice = discountPrice || product.discountPrice
            product.countInStock = countInStock || product.countInStock
            product.category = category || product.category
            product.brand = brand || product.brand
            product.sizes = sizes || product.sizes
            product.colors = colors || product.colors
            product.collections = collections || product.collections
            product.material = material || product.material
            product.gender = gender || product.gender
            product.images = images || product.images
            product.isFeatured =
            isFeatured !== undefined ? isFeatured :  product.isFeatured
            product.isPublished =
             isPublished !== undefined ?isPublished :  product.isPublished
            product.tags = tags || product.tags
            product.dimensions = dimensions || product.dimensions
            product.sku = sku || product.sku

            // save the updateed Product 
            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: "Product not found"});
        }
    } catch (error){
        console.error(error);
        res.status(500).send("Server Error")
    }
});

// @route DELETE / api / products / id
// @desc deletemamproduct by id
// @access private/admin

router.delete("/:id", protect,admin, async (req, res) =>{
    try{
        // find the peoduct by ID
        const product = await Product.findById(req.params.id);
        if(product){
            //Remove the product from the data base
            await product.deleteOne();
            res.json({message: "product removed"});
        } else{
            res.status(404).json({message: "Product not found"});
        }
    } catch(error){
        console.error(error);
        res.status(500).send("Server Error")
    } 
});

module.exports = router;