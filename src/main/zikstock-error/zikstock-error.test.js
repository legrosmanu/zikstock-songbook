const { ZikStockError } = require('./zikstock-error');

describe('zikstock-errors', () => {

    it('should get the good message if the code exists', () => {
        let error = new ZikStockError("400-1");
        expect(error.message).toEqual("ZikResource validation failed: must have at least a title and a url.");
        expect(error.code).toEqual("400-1");
        expect(error.status).toEqual(400);
    });

    it('should provide an special message if the code doesn\'t exist', () => {
        let error = new ZikStockError("1");
        expect(error.message === "Unknown error").toBe(true);
    });

});
