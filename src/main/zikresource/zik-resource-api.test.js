const request = require('supertest');
const app = require('../app');
const ZikResourceDao = require('./zikresource-dao');
const ZikStockError = require('../zikstock-error/zikstock-error');

describe('/POST zikresource', () => {

    afterEach(() => {
        jest.spyOn(ZikResourceDao, 'saveZikResource').mockReset();
        jest.spyOn(ZikResourceDao, 'retrieveZikResourceById').mockReset();
        jest.spyOn(ZikResourceDao, 'deleteZikResource').mockReset();
        jest.spyOn(ZikResourceDao, 'updateZikResource').mockReset();
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

describe('/GET zikresource', () => {

    it("should return a 200 HTTP code and the resource expected according to the given id.", async () => {
        // Given an id of a resource
        let id = "9875ed60-d11d-4126-b7e0-56c01d9c3ea3";
        jest.spyOn(ZikResourceDao, 'retrieveZikResourceById').mockImplementationOnce(() => {
            let fakeData = {};
            return fakeData;
        });
        // When we try to retrieve
        const res = await request(app).get('/api/zikresources/' + id);
        // Then we have a 200 HTTP code
        expect(res.statusCode).toEqual(200);
        expect(res.body).not.toBeNull();
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

describe('/DELETE zikresource', () => {

    it("should return a 204 HTTP code if the resource is known and deleted.", async () => {
        // Given an id of a resource known
        let id = "9875ed60-d11d-4126-b7e0-56c01d9c3ea3";
        jest.spyOn(ZikResourceDao, 'retrieveZikResourceById').mockImplementation(() => {
            let fakeData = {};
            return fakeData;
        });
        jest.spyOn(ZikResourceDao, 'deleteZikResource').mockImplementationOnce();
        // When we try to retrieve
        const res = await request(app).delete('/api/zikresources/' + id);
        // Then we have a 204 HTTP code
        expect(res.statusCode).toEqual(204);
    });

    it("should return a 204 HTTP code if the resource is unknown.", async () => {
        // Given an id of a resource unknown
        let id = "pouet";
        jest.spyOn(ZikResourceDao, 'retrieveZikResourceById').mockImplementation(() => {
            return null; // If the resource is unknonw, the DAO returns null
        });
        jest.spyOn(ZikResourceDao, 'deleteZikResource').mockImplementation();
        // When we try to retrieve
        const res = await request(app).delete('/api/zikresources/' + id);
        // Then we have a 204 HTTP code
        expect(res.statusCode).toEqual(204);
    });

});

describe('/PUT zikresource', () => {

    it("should return a 200 HTTP code if the resource is known and the resource updated .", async () => {
        // Given an id of a resource
        let id = "9875ed60-d11d-4126-b7e0-56c01d9c3ea3";
        jest.spyOn(ZikResourceDao, 'updateZikResource').mockImplementationOnce(() => {
            let fakeData = {};
            return fakeData;
        });
        // When we try to retrieve
        const res = await request(app).put('/api/zikresources/' + id).send({});
        // Then we have a 200 HTTP code
        expect(res.statusCode).toEqual(200);
        expect(res.body).not.toBeNull();
    });

    it("should return a 404 HTTP code if the resource to update is unknown.", async () => {
        // Given an id of a resource
        let id = "pouet";
        jest.spyOn(ZikResourceDao, 'updateZikResource').mockImplementation(() => {
            return null; // If the resource is unknonw, the DAO returns null
        });
        // When we try to retrieve
        const res = await request(app).put('/api/zikresources/' + id).send({});
        // Then we have a 404 HTTP code
        expect(res.statusCode).toEqual(404);
    });

});
