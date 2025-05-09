const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {protect} = require("../middlewere/authMiddlewere")

const router = express.Router();

// @route POST / api/ user/register
//  @desc Regidter a new user
// @ access Public

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    // ✅ Basic validation
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // ✅ Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // ✅ Create and save new user (password will be hashed in pre-save middleware)
        user = new User({ name, email, password });
        await user.save();

        // ✅ Create JWT payload
        const payload = {
            user: {
                id: user._id,
                role: user.role,
            },
        };

        // ✅ Sign JWT token
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "24h" }, // ✅ FIXED: "24h" is valid, "40h" is not guaranteed to work in all libs
            (err, token) => {
                if (err) throw err;

                // ✅ Send user info and token
                res.status(201).json({
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    },
                    token,
                });
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" }); // ✅ FIXED: Use .status() correctly
    }
});

// @route POST /api/user/login
// @desc Authenticate user
// @access Public

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log("Login attempt:", email, password);
  
    try {
      let user = await User.findOne({ email });
      if (!user) {
        console.log("User not found");
        return res.status(400).json({ message: "Invalid Credentials" });
      }
  
      const isMatch = await user.matchPassword(password);
      console.log("Password match:", isMatch);
  
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credential" }); // fix typo here
      }

        
    //    Create JWT payload

    const payload = {user: { id: user._id, role:user.role}};
        
          // Sign and return the token along with user data
    jwt.sign(
        payload, 
        process.env.JWT_SECRET, 
        {expiresIn: "40h"}, (err, token) => {
        if(err) throw err;

        // Send the user and token in response 
        res.json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token,
        });
    });

    }catch (error) {
        console.error(error)
        res.status(500).json({message: "Server Error"});
    }
})

// @router GET /api/user/profile 
// @desc Get logge-in user's profile [producted route]
// @access Private
router.get("/profile", protect, async (req, res)=>{
    res.json(req.user);
} )
module.exports = router;