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
        jest.spyOn(ZikResourceDao, 'saveZikResource').mockImplementationOnce(() => {
            throw new ZikStockError("400-1");
        });
        // When we do a POST with this ZikResource
        const res = await request(app).post('/api/zikresources').send({});
        // Then we have a 400 HTTP code
        expect(res.statusCode).toEqual(400);
        expect(res.body.code).toEqual("400-1");
    });

});

describe('/GET ZikResource', () => {

    it("should return a 200 HTTP code and the resource expected according to the given id.", async () => {
        // Given an id of a resource
        let id = "9875ed60-d11d-4126-b7e0-56c01d9c3ea3";
        jest.spyOn(ZikResourceDao, 'retrieveZikResourceById').mockImplementationOnce(() => {
            let data = {
                _id: "9875ed60-d11d-4126-b7e0-56c01d9c3ea3",
                url: "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2",
                artist: "Tool",
                title: "Sober"
            };
            return data;
        });
        // When we try to retrieve
        const res = await request(app).get('/api/zikresources/' + id);
        // Then we have a 200 HTTP code
        expect(res.statusCode).toEqual(200);
        expect(res.body._id === id).toBe(true);
    });

    it("should return a 404 HTTP code if the resource is unknown.", async () => {
        // Given an id of a resource unknown
        let id = "pouet";
        jest.spyOn(ZikResourceDao, 'retrieveZikResourceById').mockImplementationOnce(() => {
            return null;
        });
        // When we try to retrieve
        const res = await request(app).get('/api/zikresources/' + id);
        // Then we have a 404 HTTP code
        expect(res.statusCode).toEqual(404);
    });

});
