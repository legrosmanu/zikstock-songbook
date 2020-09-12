const ZikResource = require('../main/dto/zik-resource');

describe('zik-resource', () => {

    it('should be equals', () => {
        let data1 = new ZikResource({
            "url": "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2",
            "artist": "Tool",
            "title": "Sober",
            "addedBy": "test",
            "tags": [
                {
                    "label": "difficulty",
                    "value": "intermediate"
                },
                {
                    "label": "type",
                    "value": "tab"
                },
                {
                    "label": "",
                    "value": "My personal tag"
                }
            ]
        });
        let data2 = {
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
        expect(data1.equals(data2)).toBe(true);
    });

    it('should not be equals on the simple values', () => {
        let data1 = new ZikResource({
            "url": "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2",
            "artist": "Tool",
            "title": "Sober",
            "addedBy": "test"
        });
        let data2 = {
            "url": "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2",
            "artist": "Tool",
            "title": "Sober",
            "addedBy": "test2"
        };
        expect(data1.equals(data2)).toBe(false);
    });

    it('should not be equals even if on tags are differents', () => {
        let data1 = new ZikResource({
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
                    "value": "simple"
                },
                {
                    "label": "",
                    "value": "My personal tag"
                }
            ]
        });
        let data2 = {
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
        expect(data1.equals(data2)).toBe(false);
    });

});