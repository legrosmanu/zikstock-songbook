const { TestDbHandler } = require('../../test/testdb-handler');
const { ZikStockError } = require('../zikstock-error/zikstock-error');
const { ZikresourceBLO } = require('./zikresource-blo');
const { ZikresourceDAO } = require('./zikresource-dao');

describe('The Zikresource creation: ', () => {

    let bloToTest = null;

    beforeAll(async () => {
        let dbHandler = new TestDbHandler();
        await dbHandler.connect();
        bloToTest = new ZikresourceBLO(jest.mocked(ZikresourceDAO, true));
    });

    afterAll(() => {
        jest.resetAllMocks();
    });

    it("should throw an exception if the ZikResource doesn't have a url.", async () => {
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

    it("should throw an exception if the ZikResource doesn't have a url.", async () => {

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

    it("should throw an exception if the ZikResource has more than 10 tags.", async () => {

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

});
