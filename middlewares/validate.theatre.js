const validateTheatre = (req, res, next) => {
  const { name, description, city, pincode, totalSeats } = req.body;

  if (!name || !description || !city || !pincode || !totalSeats) {
    return res.status(400).json({
      success: false,
      message: `Name, description, city, pincode and totalSeats fields should be provided`,
    });
  }

  next();
};

module.exports = {
  validateTheatre,
};
