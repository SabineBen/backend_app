const express = require('express');
const { authAdmin } = require('../middlewares/authAdmin.js');
const { authMiddleware } = require('../middlewares/auth.js');

const { loginAdmin } = require('../controllers/Admin/loginAdmin.js');
const { createUser } = require('../controllers/Admin/createUser.js');
const { deleteUser } = require('../controllers/Admin/deleteUser.js');
const { updateUser } = require('../controllers/Admin/updateUser.js');
const { getUsers } = require('../controllers/Admin/getUsers.js');
const { getUserById } = require('../controllers/Admin/getUserById.js');

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/create-user', authAdmin, createUser);
router.delete('/delete-user/:id', authAdmin, deleteUser);
router.put('/update-user/:id', authAdmin, updateUser);
router.get('/users', authAdmin, authMiddleware, getUsers);
router.get('/user/:id', authAdmin, getUserById);

module.exports = { adminRouter: router };
