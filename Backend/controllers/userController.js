const User = require('../models/user');
const upload = require('../config/multer');

// Create User
exports.createUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const profileImage = req.file ? `/uploads/${req.file.filename}` : null;

    const newUser = new User({
      name,
      email,
      phone,
      profileImage,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const profileImage = req.file ? `/uploads/${req.file.filename}` : null;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, profileImage },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
