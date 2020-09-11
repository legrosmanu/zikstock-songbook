const ZikResourceBlo = require('../main/bll/zik-resource-blo');
const ZikResource = require('../main/dto/zik-resource');
//const ZikStockError = require('../main/helpers/zik-stock-error');

describe('zik-resource-blo', () => {

    let blo = null;

    beforeAll(() => {
        blo = new ZikResourceBlo();
    });

    // Add tests for exception to test the checkValidData
    
    it('should create a zikresource if the data are valid to create a zikresource', async () => {
        let data = {
            "url": "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2",
            "artist": "Tool",
            "title": "Sober",
            "added-by": "test",
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