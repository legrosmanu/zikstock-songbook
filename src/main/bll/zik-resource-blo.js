const ZikStockError = require('../helpers/zik-stock-error');

class ZikResourceBlo {

    constructor(dao) {
        this.dao = dao;
    }

    async createZikResource(data) {
        this.checkValidData(data);
    }

    checkValidData(data) {
        if (!data || !data.hasOwnProperty('url') || !data.hasOwnProperty('title')
            || data.url.length < 1 || data.title.length < 1) {
            throw new ZikStockError("400-1");
        }
        if (data.hasOwnProperty('tags') && data.tags.length > 10) {
            throw new ZikStockError("400-2");
        }
    }

}

module.exports = ZikResourceBlo;
