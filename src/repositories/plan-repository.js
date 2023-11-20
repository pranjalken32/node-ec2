//const { Plan } = require('../models')
const CrudRepository = require('./crud-repository');

class PlanRepository extends CrudRepository{
    constructor(){
        super();
    }    

    async getPlans(){
        try {
            // const plans = await Plan.findOne({});
            const plans = [
                {
                    name: 'free',
                    validity: '3 days',
                    sessions: 1
                },
                {
                    name: 'basic',
                    validity: '1 month',
                    sessions: 3
                },
                {
                    name: 'advanced',
                    validity: '3 months',
                    sessions: 10
                },
            ]
            return plans;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PlanRepository;