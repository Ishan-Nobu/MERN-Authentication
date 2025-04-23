const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { registerUser, loginUser, logoutUser, getUser, updateUser } = require('../controllers/userController')
const auth = require('../middlewares/authMiddleware')

router.post('/register', [
    check('username', 'please enter a username').not().isEmpty(),
    check('email', 'please enter a valid email').isEmail(),
    check('password', 'please enter a valid password with 8 or more characters').isLength({ min : 8 })
], registerUser)

router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], loginUser)

router.post('/logout', logoutUser);
router.get('/user', auth, getUser);
router.put('/update', auth, updateUser);

module.exports = router;