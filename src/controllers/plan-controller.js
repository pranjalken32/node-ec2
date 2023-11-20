const {SuccessResponse, ErrorResponse} = require('../utils/common')
const {PlanService}  = require('../services');
const {StatusCodes} = require('http-status-codes');

async function getPlans(req, res){
    try {;
        const response = await PlanService.getPlans();
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);

    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

module.exports = {
    getPlans
}