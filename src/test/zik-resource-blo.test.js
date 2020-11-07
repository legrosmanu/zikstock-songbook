const ZikResourceBlo = require('../main/bll/zik-resource-blo');
const ZikResource = require('../main/dto/zik-resource');
const ZikStockError = require('../main/helpers/zik-stock-error');

describe('zik-resource-blo', () => {

    let blo = null;

    beforeAll(() => {
        blo = new ZikResourceBlo();
    });

    // Check if the 2 mandatory fiels (url and title) are here
    // and if the zikResource doesn't have more than 10 tags
    it('should throw an exception if the data are not valide to create a zikresource', async () => {
        let error;

        // url is missing
        let data = {
            "artist": "Tool",
            "title": "Sober",
            "addedBy": "test"
        };
        try {
            await blo.createZikResource(data);
        } catch (err) {
            error = err;
        }
        expect(error instanceof ZikStockError).toBe(true);
        expect(error.code).toEqual("400-1");

        // title is missing
        data = {
            "url": "Tool",
            "addedBy": "test"
        };
        try {
            await blo.createZikResource(data);
        } catch (err) {
            error = err;
        }
        expect(error instanceof ZikStockError).toBe(true);
        expect(error.code).toEqual("400-1");

        // Too much tags (max 10)
        data = {
            "url": "Tool",
            "title": "Sober",
            "addedBy": "test",
            "tags": [{ "label": "tag1", "value": "tag1" }, { "label": "tag2", "value": "tag2" },
            { "label": "tag3", "value": "tag3" }, { "label": "tag4", "value": "tag4" },
            { "label": "tag5", "value": "tag5" }, { "label": "tag6", "value": "tag6" },
            { "label": "tag7", "value": "tag7" }, { "label": "tag8", "value": "tag8" },
            { "label": "tag9", "value": "tag9" }, { "label": "tag10", "value": "tag10" },
            { "label": "tag11", "value": "tag11" }]
        };
        try {
            await blo.createZikResource(data);
        } catch (err) {
            error = err;
        }
        expect(error instanceof ZikStockError).toBe(true);
        expect(error.code).toEqual("400-2");

    });

    it('should create a zikresource if the data are valid to create it', async () => {
        let data = {
            "url": "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2",
            "artist": "Tool",
            "title": "Sober",
            "addedBy": "test",
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
        let zikResource = await blo.createZikResource(data);
        expect(zikResource !== undefined).toBe(true);
        expect(zikResource instanceof ZikResource).toBe(true);
    });

});