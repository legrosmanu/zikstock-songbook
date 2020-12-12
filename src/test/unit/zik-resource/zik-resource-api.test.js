const request = require('supertest');
const app = require('../../../main/app');
const ZikResourceDao = require('../../../main/zikresource/zikresource-dao');
const ZikStockError = require('../../../main/zikresource/zikstock-error');

describe('/POST zikresource', () => {

    afterEach(() => {
        jest.spyOn(ZikResourceDao, 'saveZikResource').mockReset();
    });

    it("should return a 201 HTTP code and the ZikResource as response", async () => {
        // Given no problem on the other layers
        jest.spyOn(ZikResourceDao, 'saveZikResource').mockImplementation();
        // When we do a POST with this ZikResource
        const res = await request(app).post('/api/zikresources').send({});
        // Then, we have a 201
        expect(res.statusCode).toEqual(201);
    });

    it("should return a 400 HTTP code if the data are not as expected to create a ZikResource.", async () => {
        // Given a known functionnal exception
        jest.spyOn(ZikResourceDao, 'saveZikResource').mockImplementationOnce(() => { throw new ZikStockError("400-1") });
        // When we do a POST with this ZikResource
        const res = await request(app).post('/api/zikresources').send({});
        // We have a 400 HTTP code
        expect(res.statusCode).toEqual(400);
    });

});
