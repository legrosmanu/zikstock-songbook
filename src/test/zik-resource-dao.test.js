const ZikResourceDao = require('../main/dll/dao/zik-resource-dao');
const ZikStockError = require('../main/helpers/zik-stock-error');
const ZikResource = require('../main/dll/dto/zik-resource');

const dbHandler = require('./memory-db-handler');

describe('zik-resource-dao-creation', () => {

    beforeAll(async () => await dbHandler.connect());
    afterAll(async () => {
        await dbHandler.clearDatabase();
        await dbHandler.closeDatabase();
    });

    // Check if the 2 mandatory fiels (url and title) are here
    // and if the zikResource doesn't have more than 10 tags
    it('should throw an exception if the data are not valide to create a zikresource', async () => {
        let error;

        // url is missing
        let data = {
            "artist": "Tool",
            "title": "Sober"
        };
        try {
            await ZikResourceDao.saveZikResource(data);
        } catch (err) {
            error = err;
        }
        expect(error instanceof ZikStockError).toBe(true);
        expect(error.code).toEqual("400-1");

        // title is missing
        data = {
            "url": "Tool"
        };
        try {
            await ZikResourceDao.saveZikResource(data);
        } catch (err) {
            error = err;
        }
        expect(error instanceof ZikStockError).toBe(true);
        expect(error.code).toEqual("400-1");

        // Too much tags (max 10)
        data = {
            "url": "Tool",
            "title": "Sober",
            "tags": [{ "label": "tag1", "value": "tag1" }, { "label": "tag2", "value": "tag2" },
            { "label": "tag3", "value": "tag3" }, { "label": "tag4", "value": "tag4" },
            { "label": "tag5", "value": "tag5" }, { "label": "tag6", "value": "tag6" },
            { "label": "tag7", "value": "tag7" }, { "label": "tag8", "value": "tag8" },
            { "label": "tag9", "value": "tag9" }, { "label": "tag10", "value": "tag10" },
            { "label": "tag11", "value": "tag11" }]
        };
        try {
            await ZikResourceDao.saveZikResource(data);
        } catch (err) {
            error = err;
        }
        expect(error instanceof ZikStockError).toBe(true);
        expect(error.code).toEqual("400-1");

    });

    it('should create a zikresource if the data are valid to create it', async () => {

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
        let zikResource = await ZikResourceDao.saveZikResource(correctData);
        expect(zikResource != null).toBe(true);
    });

});

describe('zik-resource-dao-removal', () => {

    let zikResourceTest = null;

    beforeAll(async () => {
        await dbHandler.connect();
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
        let zikResource = new ZikResource(correctData);
        zikResourceTest = await zikResource.save();
    });
    afterAll(async () => {
        await dbHandler.clearDatabase();
        await dbHandler.closeDatabase();
    });


    it('should delete a zikResource if the resource exists', async () => {
        let zikResources = await ZikResource.find({});
        expect(zikResources.length === 1).toBe(true);
        const isDeleted = await ZikResourceDao.deleteZikResource(zikResourceTest);
        zikResources = await ZikResource.find({});
        expect(zikResources.length === 0).toBe(true);
        expect(isDeleted).toBe(true);
    });

    it("should return false if zikResource doesn't exist. Indeed the database is empty.", async () => {
        let zikResource = new ZikResource();
        expect(await ZikResourceDao.deleteZikResource(zikResource)).toBe(false);
    });

});
