const {PlanRepository} = require('../repositories')
const AppError = require('../utils/errors/app-error')
const {StatusCodes} = require('http-status-codes');

const planRepository = new PlanRepository();

async function getPlans(){
    try {
        const plans = await planRepository.getPlans();
        return plans;
    } catch (error) {
        const appError = new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
        throw appError;
    }
}

module.exports = {
    getPlans,
}