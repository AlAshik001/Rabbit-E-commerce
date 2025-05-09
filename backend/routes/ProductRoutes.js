const express = require("express");
const product = require("../models/Product");
const {protect, admin} = require("../middlewere/authMiddlewere");
const Product = require("../models/Product");


const router =express.Router();

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

// @route Get/api/products
//@desc get al product with optional qurey filter
// @access public

router.get("/", async (req, res) =>{
    try {
        const {collection, 
            size, 
            color,
             gender, 
             minPrice, 
             maxPrice, 
             sortBy, 
            search, 
            category, 
            material, 
            brand, 
            limit,
        } = req.query;
        let query = {};
        console.log("product", limit)
        if (collection && collection.toLocaleLowerCase() !== "all") {
            query.collections = collection;
        }

        if (category && category.toLocaleLowerCase() !== "all") {
            query.category = category;
        }

        if(brand){
            query.brand = {$in: brand.split(",") };
        }

        if(size){
            query.sizes = {$in: size.split(",") };
        }

        if(color)
        {
            query.colors = {$in: [color]};
        }

        if(gender){
            query.gender = gender;
        }

        if(minPrice || maxPrice) {
            query.price = {};
            if(minPrice) query.price.$gte =  Number(minPrice);
            if(maxPrice) query.price.$lte =  Number(maxPrice);
            
        }

        if(search){
            query.$or = [
                {name : {$regex: search, $options: "i"}},
                {description : {$regex: search, $options: "i"}},
            ];
        }

        // sort Logic
        let sort = {};

        if(sortBy){
            switch (sortBy){
                case "priceAsc":
                    sort = {price: 1};
                    break;
                    case "priceDesc":
                        sort = {price: -1};
                        break;
                        case "popularity":
                            sort = {rating: -1};
                            break;
                            default:
                                break;
            }
        }


        //  Fetch product and apply sorting and limit
        let products = await Product.find(query)
        .sort(sort)
        .limit(Number(limit) || 0);
         res.json(products);
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});


//@route GET / api/products/best-seller
//@deac Retrive product with highest rating
//@access Public 

router.get("/best-seller",async(req, res) =>{
    try {
        const bestSeller=await Product.findOne().sort({ rating: -1});
        if(bestSeller){
            res.json(bestSeller);
        }
        else{
            res.status(404).json({message: " No best-seller Found"})
        }
    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error");
    }
});

// @route GET/api/product/new-arivals
//@deac Retrive latest 8 product 
// @access public

router.get("/new-arrivals", async (req, res)=>{
    try {
        //Fetch 8 products
        const newArrivals = await Product.find().sort({createdAt: -1}).limit(8)
        res.json(newArrivals)
    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error")
    }
});


// @route GET/api/product/:id
// @desc Get a single product by ID
// @access public

router.get("/:id", async (req, res) =>{
    try {
        const product = await Product.findById(req.params.id);
        if(product){
            res.json(product);
        }
        else{
            res.status(404).json({message: "Product Not Found"});
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

//@route GET / api/products/similar/:id
//@deac Retrive similar products based on the current product's gender and category
//@access Public 

router.get("/similar/:id",async (req, res)=> {
    const { id } = req.params;
    
    try {
        const product = await Product.findById(id);

        if(!product){
            return res.status(404).json({message: "Product not found"})
        }

        const similarProduct = await Product.find({
            _id: {$ne: id}, // Exclude the current product ID
            gender: product.gender,
            category: product.category
        }).limit(4);
        res.json(similarProduct);
    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error")
    }

});



module.exports = router;