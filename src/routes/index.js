const express = require('express');
const {loginController, signupController} = require('../controllers/index')


const v1Routes = require('./v1')
const router = express.Router();

router.use('/v1', v1Routes);


module.exports = router;