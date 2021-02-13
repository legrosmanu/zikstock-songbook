const request = require('supertest');
const app = require('../app');
const { ZikStockError } = require('../zikstock-error/zikstock-error');
const { ZikresourceBLO } = require('./zikresource-blo');
jest.mock('./zikresource-blo');

describe('/POST zikresource', () => {

    it("should return a 201 HTTP code and the Zikresource as response", async () => {
        // Given no problem on the other layers and imagine the Zikresource is correct
        jest.spyOn(ZikresourceBLO, 'createZikresource');
        // When we do a POST with this Zikresource
        const res = await request(app).post('/api/zikresources').send({});
        // Then, we have a 201
        expect(res.statusCode).toEqual(201);
    });

    it("should return a 400 HTTP code if the data are not as expected to create a ZikResource.", async () => {
        // Given a known functionnal exception
        jest.spyOn(ZikresourceBLO, 'createZikresource').mockImplementationOnce(() => {
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
        // When we try to retrieve
        const res = await request(app).get('/api/zikresources/' + id);
        // Then we have a 200 HTTP code
        expect(res.statusCode).toEqual(200);
        expect(res.body).not.toBeNull();
    });

    it("should return a 404 HTTP code if the resource is unknown.", async () => {
        // Given an id of a resource unknown
        let id = "pouet";
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
        // When we try to retrieve
        const res = await request(app).delete('/api/zikresources/' + id);
        // Then we have a 204 HTTP code
        expect(res.statusCode).toEqual(204);
    });

    it("should return a 204 HTTP code if the resource is unknown.", async () => {
        // Given an id of a resource unknown
        let id = "pouet";
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
        // When we try to retrieve
        const res = await request(app).put('/api/zikresources/' + id).send({});
        // Then we have a 200 HTTP code
        expect(res.statusCode).toEqual(200);
        expect(res.body).not.toBeNull();
    });

    it("should return a 404 HTTP code if the resource to update is unknown.", async () => {
        // Given an id of a resource
        let id = "pouet";
        // When we try to retrieve
        const res = await request(app).put('/api/zikresources/' + id).send({});
        // Then we have a 404 HTTP code
        expect(res.statusCode).toEqual(404);
    });

});
