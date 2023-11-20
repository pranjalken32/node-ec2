const express = require('express');
const PlanRoutes = require('./plan-routes');


const router = express.Router();

router.use('/plan', PlanRoutes);



module.exports = router;