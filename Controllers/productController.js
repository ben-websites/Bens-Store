const Product = require("../Models/productModel.js");
const cloudinary = require("../config/cloudnary.js");


const getProduct = async (req, res) => {
  try {
    const products = await Product.find();

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      stock,
      brand,
    } = req.body;

    if (Number(price) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be greater than 0.",
      });
    }

    if (Number(stock) < 0) {
      return res.status(400).json({
        success: false,
        message: "Stock cannot be negative.",
      });
    }

    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
      });

      imageUrl = result.secure_url;
    }

    const newProduct = await Product.create({
      title,
      description,
      price,
      category,
      stock,
      brand,
      image: imageUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
      data: deletedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const updateProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      stock,
      brand,
    } = req.body;

    const updatedProduct = await Product.findById(req.params.id);

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    
    if (price && Number(price) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be greater than 0.",
      });
    }

    if (stock && Number(stock) < 0) {
      return res.status(400).json({
        success: false,
        message: "Stock cannot be negative.",
      });
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
      });

      updatedProduct.image = result.secure_url;
    }

    if (title) updatedProduct.title = title;
    if (description) updatedProduct.description = description;
    if (price) updatedProduct.price = price;
    if (category) updatedProduct.category = category;
    if (stock) updatedProduct.stock = stock;
    if (brand) updatedProduct.brand = brand;

    await updatedProduct.save();

    return res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
};