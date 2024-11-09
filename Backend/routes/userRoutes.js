const express = require('express');
const { createUser, getUsers, updateUser, deleteUser } = require('../controllers/userController');
const upload = require('../config/multer');
const router = express.Router();

router.post('/', upload.single('profileImage'), createUser);
router.get('/', getUsers);
router.put('/:id', upload.single('profileImage'), updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
