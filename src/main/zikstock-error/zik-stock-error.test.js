const ZikStockError = require('./zikstock-error');

describe('zikstock-errors', () => {

    it('should get the good message if the code exists', () => {
        let error = new ZikStockError("400-1");
        expect(error.message === "The URL and the title are the mandatory fields to create a zikresource.");
        expect(error.code === "400-1").toBe(true);
        expect(error.status === 400).toBe(true);
    });

    it('should provide an empty message if the code doesn\'t exist', () => {
        let error = new ZikStockError("1");
        expect(error.message === "").toBe(true);
    });

});
