const { Router } = require("express");
const ProductRouter = Router();
const ProductModal = require("../modals/ProductModal");



ProductRouter.post('/', async (req, res) => {
    const { name, price, stock, image, category } = req.body

    try {
        if (!name || !price || !stock || !category) {
            return res.status(400).json({ message: "All fields are required" })
        }

        if (isNaN(price) || isNaN(stock)) {
            return res.status(400).json({ message: "Price and Stock must be numbers" });
        }

        const newData = new ProductModal({
            name,
            price,
            stock,
            category,
            // image
        })

        await newData.save()
        res.status(201).json({ message: "Product added", data: newData });
    }
    catch (err) {
        console.error("Signup error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }

})



ProductRouter.patch('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedProduct = await ProductModal.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct,
    });

  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});



ProductRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await ProductModal.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      data: deletedProduct
    });

  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


ProductRouter.get('/', async (req, res) => {
  try {
    const { search } = req.query;

    const filter = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    const products = await ProductModal.find(filter);

    res.status(200).json(products);

  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = ProductRouter