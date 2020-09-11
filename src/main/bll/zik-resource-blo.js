const ZikStockError = require('../helpers/zik-stock-error');
const ZikResource = require('../dto/zik-resource');

class ZikResourceBlo {

    constructor(dao) {
        this.dao = dao;
    }

    async createZikResource(data) {
        let zikResource = new ZikResource();
        this.checkValidData(data);
        return zikResource;
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
