const ZikResourceDao = require('../main/dll/dao/zik-resource-dao');
const ZikStockError = require('../main/helpers/zik-stock-error');
const ZikResource = require('../main/dll/dto/zik-resource');

const dbHandler = require('./memory-db-handler');

describe('zik-resource-dao', () => {

    let zikResourceTest = null;

    let correctData = {
        "url": "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2",
        "artist": "Tool",
        "title": "Sober",
        "tags": [
            {
                "label": "type",
                "value": "tab"
            },
            {
                "label": "difficulty",
                "value": "intermediate"
            },
            {
                "label": "",
                "value": "My personal tag"
            }
        ]
    };

    beforeAll(async () => await dbHandler.connect());
    afterEach(async () => await dbHandler.clearDatabase());
    afterAll(async () => await dbHandler.closeDatabase());

    it("should throw an exception if the ZikResource doesn't have a url.", async () => {

        // Given a simple ZikResource only with a title, and so without the url field
        let data = {
            "title": "Sober"
        };

        // When we want to save it on the database
        let error = null;
        try {
            await ZikResourceDao.saveZikResource(data);
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
            await ZikResourceDao.saveZikResource(data);
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
            await ZikResourceDao.saveZikResource(data);
        } catch (err) {
            error = err;
        }
        // Then an exception is thrown
        expect(error instanceof ZikStockError).toBe(true);
        // And the exception has the code 400-1
        expect(error.code).toEqual("400-1");

    });

    it("should create a zikresource if the ZikResource is valid to create it.", async () => {

        // Given a simple ZikResource, with an url, a title and less than 10 tags
        let data = correctData;
        // When we want to save it on the database
        let zikResource = await ZikResourceDao.saveZikResource(data);
        // Then the zikResource created is not null
        expect(zikResource != null).toBe(true);
        // And the url is the url given as input
        expect(correctData.url === zikResource.url).toBe(true);
        // And the title is the title given as input
        expect(correctData.title === zikResource.title).toBe(true);
        // And the tags are the tags given as input
        expect(correctData.tags.length === zikResource.tags.length).toBe(true);
    });


    it('should delete a zikResource if the resource exists.', async () => {
        // Given one ZikResource in the database (because afterEach, we clear the DB)
        let zikResource = new ZikResource(correctData);
        zikResourceTest = await zikResource.save();
        expect(await ZikResource.estimatedDocumentCount() === 1).toBe(true);
        // When we delete it
        await ZikResourceDao.deleteZikResource(zikResourceTest);
        // Then we have no more ZikResource in the database
        expect(await ZikResource.estimatedDocumentCount() === 0).toBe(true);
    });

    it("should have no impact if we try to deelte a resource which doesn't exist.", async () => {
        // Given the empty database (because afterEach, we clear the DB)
        expect(await ZikResource.estimatedDocumentCount() === 0).toBe(true);
        // When we try to delete a ZikResource which doesn't exist
        let zikResource = new ZikResource();
        await ZikResourceDao.deleteZikResource(zikResource);
        // Then we have no exception and the database continues to be empty
        expect(await ZikResource.estimatedDocumentCount() === 0).toBe(true);
    });

    it('should return the zikResource expected.', async () => {
        // Given one ZikResource in the database (because afterEach, we clear the DB)
        let zikResource = new ZikResource(correctData);
        zikResourceTest = await zikResource.save();
        expect(await ZikResource.estimatedDocumentCount() === 1).toBe(true);
        // When we try to retrieve it by its id
        let zikResourceRetrieved = await ZikResourceDao.retrieveZikResourceById(zikResourceTest._id);
        // Then we get the ZikResource expected
        expect(zikResourceRetrieved).not.toBeNull();
        expect(zikResourceRetrieved._id.equals(zikResourceTest._id)).toBe(true);
    });

    it("should return null if the zikResource doesn't exist.", async () => {
        // Given no ZikResource (or null)
        // When we want to retrieve it
        let zikResourceRetrieved = await ZikResourceDao.retrieveZikResourceById(null);
        // Then the zikResource got is null
        expect(zikResourceRetrieved).toBeNull();
    });

});
