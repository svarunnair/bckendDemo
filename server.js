const express = require("express");
const dbConnection = require("./db")
// require("dotenv").config()
require("dotenv").config({ quiet: true });
const cors = require("cors");
const signUpController = require("./routes/SignUpRouter");
const SigninController = require("./routes/SignInRouter");
const ProductRouter = require("./routes/ProductController");
// dotenv.config();


const app  = express()
app.use(cors());
app.use(express.json())


app.use("/signup", signUpController);
app.use("/signin", SigninController);
app.use('/product',ProductRouter)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  try {
    dbConnection()  
   console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.log("err", err);
  }
});

