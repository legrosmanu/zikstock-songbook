const ZikResourceBlo = require('../main/bll/zik-resource-blo');
const ZikStockError = require('../main/helpers/zik-stock-error');

describe('zik-resource-blo', () => {

    let blo = null;

    beforeAll(() => {
        blo = new ZikResourceBlo();
    });

    it('should throw an exception if one of the mandatory field is missingto create a zikresource', async () => {
       expect(() => { 
            let data = {
                "url": "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2",
                "artist": "Tool",
                "added-by": "test"
            };
            blo.createZikResource(data);
         }).toThrow(ZikStockError);
         expect(() => { 
            let data = {
                "title": "Sober",
                "artist": "Tool",
                "added-by": "test"
            };
            blo.createZikResource(data);
         }).toThrow(ZikStockError);
    });

    it('should throw an exception if zikresource to create has more than 10 tags', async () => {
          expect(() => { 
             let data = {
                 "url": "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2",
                 "title": "Sober",
                 "artist": "Tool",
                 "added-by": "test",
                 "tags": [{ "label": "tag1", "value": "tag1" }, { "label": "tag2", "value": "tag2" },
                 { "label": "tag3", "value": "tag3" }, { "label": "tag4", "value": "tag4" },
                 { "label": "tag5", "value": "tag5" }, { "label": "tag6", "value": "tag6" },
                 { "label": "tag7", "value": "tag7" }, { "label": "tag8", "value": "tag8" },
                 { "label": "tag9", "value": "tag9" }, { "label": "tag10", "value": "tag10" },
                 { "label": "tag11", "value": "tag11" }]
     
             };
             blo.createZikResource(data);
          }).toThrow(ZikStockError);
     });

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
        expect(zikResource !== undefined);
    });

});