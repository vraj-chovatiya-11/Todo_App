const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
// const upload = require('../middleware/upload');
const auth = require('../../utils/auth');
const { upload } = require('../../middleware/upload');

router.post('/register', upload, authController.register);

router.post('/login', authController.login);

router.get('/me', authController.getCurrentUser);

router.delete('/delete/:id', authController.deleteUser);

// router.put('/profile-image', auth, upload, authController.updateProfileImage);

module.exports = router;