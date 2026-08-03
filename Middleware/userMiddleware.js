const usermiddleware = (req, res, next) => {
  const { name, age, email } = req.body;

  // Check if all fields are present
  if (!name || !age || !email) {
    return res.status(400).json({
      status: false,
      message: "Please fill all fields.",
    });
  }

  // Validate name
  if (name.trim().length < 3) {
    return res.status(400).json({
      status: false,
      message: "Name must be at least 3 characters long.",
    });
  }

  // Validate age
  if (isNaN(age) || Number(age) < 1) {
    return res.status(400).json({
      status: false,
      message: "Please enter a valid age.",
    });
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      status: false,
      message: "Please enter a valid email address.",
    });
  }

  next();
};

module.exports = {
  usermiddleware,
};