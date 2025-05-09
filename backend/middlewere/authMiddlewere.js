const jwt = require("jsonwebtoken");
const User = require("../models/User");


const protect =async (req, res, next) =>{
    let token;

    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
    )
    {
        try{
            token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode)
            req.user = await User.findById(decode.user.id).select("-password") // Exclude password
            console.log(req.user)
            next();

        }catch (error){
            console.error("Token verfications failed:", error);
            res.status(401).json({message: "Not authorized, token faield"});  
        }
    } else{
        res.status(401).json({message: "Not authorized, no token provided"}); 
    }
};

// Middlewere to check if the user is Admin
const admin = (req, res, next) =>{
    if(req.user && req.user.role === "admin"){
        next();
    } else{
        res.status(403).json({message : "Not authorized as an admin" });
    } 
}

module.exports = { protect,admin };