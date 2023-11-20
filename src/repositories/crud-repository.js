class CrudRepository {
    constructor(model){
        this.model = model;
    }

    async create(data) {
        try {
            const response = await this.model.create(data);
            return response;
        }
        catch (error) {
            throw error;
        }
    }


    async get() {
        try {
            const response = await this.model.find({});
            return response;
        }
        catch (error) {
            throw error;
        }
    }
}

module.exports = CrudRepository;