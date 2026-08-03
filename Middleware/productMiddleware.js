const productMiddleware = (req, res, next) => {
  const {
    title,
    description,
    price,
    category,
    stock,
  } = req.body;

  if (!title || !description || !price || !category || !stock) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields.",
    });
  }

  if (title.trim().length < 3) {
    return res.status(400).json({
      success: false,
      message: "Product title must be at least 3 characters long.",
    });
  }

  if (description.trim().length < 10) {
    return res.status(400).json({
      success: false,
      message: "Description must be at least 10 characters long.",
    });
  }

  if (isNaN(price) || Number(price) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Price must be greater than 0.",
    });
  }

  if (isNaN(stock) || Number(stock) < 0) {
    return res.status(400).json({
      success: false,
      message: "Stock cannot be negative.",
    });
  }

  if (category.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid category.",
    });
  }

  next();
};

module.exports = {
  productMiddleware,
};