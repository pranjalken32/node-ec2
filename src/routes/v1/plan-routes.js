const express = require('express');
const { PlanController } = require('../../controllers');

const router = express.Router();


router.get('/', PlanController.getPlans);

module.exports = router;