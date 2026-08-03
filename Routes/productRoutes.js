const express = require("express");
const upload = require("../config/multer.js");
const productController = require("../Controllers/productController.js");
const Middleware = require("../Middleware/productMiddleware.js");

const productRouter = express.Router();

productRouter.get("/products", productController.getProduct);

productRouter.get(
  "/product/:id",productController.getSingleProduct
);

productRouter.post(
  "/addproduct",
  upload.single("image"),
  Middleware.productMiddleware,
  productController.addProduct
);

productRouter.put(
  "/updateproduct/:id",
  upload.single("image"),
  Middleware.productMiddleware,
  productController.updateProduct
);

productRouter.delete(
  "/deleteproduct/:id",
  productController.deleteProduct
);

module.exports = productRouter;