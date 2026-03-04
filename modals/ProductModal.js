const mongoose = require("mongoose")


const ProductSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    image: { type: String, required: false },
    category: { type: String, required: true }
});


const ProductModal = mongoose.model("items", ProductSchema)


module.exports = ProductModal
