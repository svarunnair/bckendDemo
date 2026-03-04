const { Router } = require("express");
const signUpController = Router();
const bcrypt = require("bcrypt");
const SignUpModal = require('../modals/SignUpModal');


const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};



signUpController.post('/', async (req, res) => {
    const { name, email, password, } = req.body;

    try {

        if (!name || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (name?.length < 3) {
            return res
                .status(400)
                .json({ message: "Name must be at least 3 characters long" });
        }


        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (password.length < 5) {
            return res.status(400).json({
                message:
                    "Password must be at least 6 numbers",
            });
        }

        const saltRounds = parseInt(process.env.SALT_ROUND) || 10;

        const hashPassword = await bcrypt.hash(password, 10)

        const findEmail = await SignUpModal.findOne({ email })

        if (findEmail) {
            return res.status(400).json({
                message:
                    "Email id is already registered",
            });
        }

        const newUser = new SignUpModal({
            name,
            email,
            password: hashPassword,
        });

        await newUser.save()
        res.status(200).json({ message: "User signup successful", data: req.body });

    }
    catch (err) {
        console.error("Signup error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
})


module.exports = signUpController;