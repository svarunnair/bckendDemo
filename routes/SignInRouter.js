const {Router} = require("express");
// const {SigninModal} = require("../Modal/SigninModal");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const SignUpModal = require("../modals/SignUpModal");
require("dotenv").config()

const SigninController = Router();


const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};


SigninController.post('/',async (req, res)=>{
    const {email, password} = req.body
    try{
          if (!email ||!password) {
          return res.status(400).json({ message: "All fields are required" });
          }

          if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
          }

          const findUser = await SignUpModal.findOne({email})
           if (!findUser) {
             return res.status(404).json({ message: "User not found" });
           }

           const isPasswordValid =  await bcrypt.compare(password, findUser.password)

           if (!isPasswordValid) {
             return res.status(401).json({ message: "Invalid credentials" });
           }

           const token = jwt.sign(
             { userId: findUser._id, email: findUser.email },
             process.env.JWT_KEY || "jwt_secret_key"
           ); 

           res.status(200).json({
             message: "Signin successful",
             token,
             user: {
               id: findUser._id,
               name: findUser.name,
               email: findUser.email,
             },
           });


    }
    catch(err){
        console.log('signin error: ',err)
        res.status(500).json({message:"Internal server error"})
    }
})



module.exports = SigninController


