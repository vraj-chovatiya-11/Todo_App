const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
// const upload = require('../middleware/upload');
const auth = require('../../utils/auth');
const { upload } = require('../../middleware/upload');

// router.use(auth);

router.post('/register', upload, authController.register);

router.post('/login', authController.login);

router.get('/me', auth, authController.getCurrentUser);
router.delete('/:id', auth, authController.deleteUser);

// router.delete('/delete/:id', authController.deleteUser);

// router.put('/profile-image', auth, upload, authController.updateProfileImage);

module.exports = router;