const ZikStockError = require('../helpers/zik-stock-error');
const ZikResource = require('../dto/zik-resource');

class ZikResourceBlo {

    constructor(dao) {
        this.dao = dao;
    }

    async createZikResource(data) {
        let zikResource = new ZikResource(data);
        this.checkValidData(data);
        return zikResource;
    }

    checkValidData(data) {
        // url and title are mandatory fields
        if (!data || !Object.prototype.hasOwnProperty.call(data,'url') 
            || !Object.prototype.hasOwnProperty.call(data, 'title')
            || data.url.length < 1 || data.title.length < 1) {
            throw new ZikStockError("400-1");
        }
        // the resource must not have more than 10 tags
        if (Object.prototype.hasOwnProperty.call(data,'tags') && data.tags.length > 10) {
            throw new ZikStockError("400-2");
        }
    }

}

module.exports = ZikResourceBlo;
