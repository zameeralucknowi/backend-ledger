const express = require('express')
const router = express.Router();
const {signupController }  = require('../controllers/auth.controller');

router.post('/signup',signupController);
router.post('/login',)


module.exports = router;