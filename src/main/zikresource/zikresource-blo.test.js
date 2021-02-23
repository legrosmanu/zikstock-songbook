const mockSave = jest.fn();
const mockDelete = jest.fn();
const mockRetrieveAll = jest.fn();
const mockRetrieveOneById = jest.fn();
const mockUpdateOne = jest.fn();
jest.mock('./zikresource-dao', () => {
    return {
        ZikresourceDAO: jest.fn().mockImplementation(() => {
            return {
                save: mockSave,
                delete: mockDelete,
                retrieveAll: mockRetrieveAll,
                retrieveOneById: mockRetrieveOneById,
                updateOne: mockUpdateOne
            }
        }),
    };
});
const { ZikStockError } = require('../zikstock-error/zikstock-error');
const { ZikresourceBLO } = require('./zikresource-blo');

describe('The Zikresource business logic: ', () => {

    let bloToTest = null;

    beforeAll(async () => {
        bloToTest = new ZikresourceBLO();
    });

    afterAll(() => {
        jest.resetAllMocks();
    });

    it("should throw an exception when we try to create Zikresource which doesn't have a url.", async () => {
        // Given a simple ZikResource only with a title, and so without the url field
        let data = {
            "title": "Sober"
        };

        // When we want to create it on the system
        let error = null;
        try {
            await bloToTest.createZikresource(data);
        } catch (err) {
            error = err;
        }

        // Then an exception is thrown
        expect(error instanceof ZikStockError).toBe(true);
        // And the exception has the code 400-1
        expect(error.code).toEqual("400-1");
    });


    it("should throw an exception when we try to update Zikresource which doesn't have a url.", async () => {
        // Given a simple ZikResource only with a title, and so without the url field
        let data = {
            "title": "Sober"
        };

        // When we want to create it on the system
        let error = null;
        try {
            await bloToTest.updateOneZikresource("fakeId", data);
        } catch (err) {
            error = err;
        }

        // Then an exception is thrown
        expect(error instanceof ZikStockError).toBe(true);
        // And the exception has the code 400-1
        expect(error.code).toEqual("400-1");
    });

    it("should throw an exception when we try to create a ZikResource which doesn't have a url.", async () => {

        // Given a simple ZikResource only with an url, and so without the title field
        let data = {
            "url": "Tool"
        };

        // When we want to save it on the database
        let error = null;
        try {
            await bloToTest.createZikresource(data);
        } catch (err) {
            error = err;
        }

        // Then an exception is thrown
        expect(error instanceof ZikStockError).toBe(true);
        // And the exception has the code 400-1
        expect(error.code).toEqual("400-1");

    });



    it("should throw an exception when we try to update a ZikResource which doesn't have a url.", async () => {

        // Given a simple ZikResource only with an url, and so without the title field
        let data = {
            "url": "Tool"
        };

        // When we want to save it on the database
        let error = null;
        try {
            await bloToTest.updateOneZikresource("fakeId", data);
        } catch (err) {
            error = err;
        }

        // Then an exception is thrown
        expect(error instanceof ZikStockError).toBe(true);
        // And the exception has the code 400-1
        expect(error.code).toEqual("400-1");

    });

    it("should throw an exception if we try to create a ZikResource which has more than 10 tags.", async () => {

        // Given a simple ZikResource, with an url, a title and 11 tags
        let data = {
            "url": "Tool",
            "title": "Sober",
            "tags": [{ "label": "tag1", "value": "tag1" }, { "label": "tag2", "value": "tag2" },
            { "label": "tag3", "value": "tag3" }, { "label": "tag4", "value": "tag4" },
            { "label": "tag5", "value": "tag5" }, { "label": "tag6", "value": "tag6" },
            { "label": "tag7", "value": "tag7" }, { "label": "tag8", "value": "tag8" },
            { "label": "tag9", "value": "tag9" }, { "label": "tag10", "value": "tag10" },
            { "label": "tag11", "value": "tag11" }]
        };

        // When we want to save it on the database
        let error = null;
        try {
            await bloToTest.createZikresource(data);
        } catch (err) {
            error = err;
        }
        // Then an exception is thrown
        expect(error instanceof ZikStockError).toBe(true);
        // And the exception has the code 400-1
        expect(error.code).toEqual("400-2");

    });



    it("should throw an exception if we try to update a ZikResource which has more than 10 tags.", async () => {

        // Given a simple ZikResource, with an url, a title and 11 tags
        let data = {
            "url": "Tool",
            "title": "Sober",
            "tags": [{ "label": "tag1", "value": "tag1" }, { "label": "tag2", "value": "tag2" },
            { "label": "tag3", "value": "tag3" }, { "label": "tag4", "value": "tag4" },
            { "label": "tag5", "value": "tag5" }, { "label": "tag6", "value": "tag6" },
            { "label": "tag7", "value": "tag7" }, { "label": "tag8", "value": "tag8" },
            { "label": "tag9", "value": "tag9" }, { "label": "tag10", "value": "tag10" },
            { "label": "tag11", "value": "tag11" }]
        };

        // When we want to save it on the database
        let error = null;
        try {
            await bloToTest.updateOneZikresource("fakeId", data);
        } catch (err) {
            error = err;
        }
        // Then an exception is thrown
        expect(error instanceof ZikStockError).toBe(true);
        // And the exception has the code 400-1
        expect(error.code).toEqual("400-2");

    });

    it("should be ok to create or update a zikresource which is valid", async () => {
        // Given a correct Zikresource
        let data = {
            "url": "Tool",
            "title": "Sober",
            "tags": [{ "label": "tag1", "value": "tag1" }, { "label": "tag2", "value": "tag2" },
            { "label": "tag3", "value": "tag3" }, { "label": "tag4", "value": "tag4" },
            { "label": "tag5", "value": "tag5" }]
        };
        // When we want to save it on the database
        let error = null;
        try {
            /*
            await bloToTest.createZikresource(data);
            await bloToTest.updateOneZikresource("fakeId", data);*/
            await Promise.all([bloToTest.createZikresource(data), bloToTest.updateOneZikresource("fakeId", data)]);
        } catch (err) {
            error = err;
        }
        expect(error).toBeNull();
    });

    // Simple tests because no real logic = everything is covered in the DAO tests
    it("should have no unknown exception on the GET methods", async () => {
        let error = null;
        try {
            await bloToTest.getZikresources();
            await bloToTest.getOneZikresourceById("1111");
        } catch (err) {
            error = err;
        }
        expect(error).toBeNull();
    });

    // If a delete is supposed to be idempotent, we prefer to tell the user that he tried to 
    // delete a zikresource which doesn't exist
    it("should throw an exception if we want to delete a zikresource doesn't exist", async () => {
        // Given an unknown Zikresource
        let zikresource = { _id: "11111" };
        // When we try to delete it
        let error = null;
        try {
            await bloToTest.deleteOneZikresource(zikresource);
        } catch (err) {
            error = err;
        }
        // Then we have a known exception
        expect(error instanceof ZikStockError).toBe(true);
        expect(error.code).toEqual("404-1");
    });

    it("should throw an exception if we didn't succeed in the deletion of a know zikresource", async () => {
        // Given a known Zikresource
        // we mock the DAO to think we know the zikresource, but the DAO will not be able to delete,
        // it means the DAO has returned null after deletion
        mockRetrieveOneById.mockImplementation(() => {
            return {};
        });
        mockDelete.mockImplementation(() => {
            return null;
        });
        // When we try to delete it
        let error = null;
        try {
            await bloToTest.deleteOneZikresource({});
        } catch (err) {
            error = err;
        }
        // Then we have a known exception
        expect(error instanceof ZikStockError).toBe(true);
        expect(error.code).toEqual("500-4");
    });

});
