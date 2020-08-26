const request = require('supertest');
const app = require('../../main/server.js');
const MongoClient = require('mongodb');

let connection = null;

describe('zik-resource-routes', () => {

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = await connection.db();
    const zikResourcesCollection = db.collection('zik-resources');
    // The user TestNotEmpty is supposed to have 10 zik resources.
    for (let i=0 ; i < 10 ; i++) {
      zikResourcesCollection.insertOne({
        "url": "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2",
        "artist": "Tool",
        "title": "Sober",
        "added-by" : "TestNotEmpty"
      });
    }
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  describe('create a zik-resource', () => {

    it('should return a 201 just with an URL and a title.', async () => {
      const res = await request(app).post('/api/zik-resources')
        .send({
          "url": "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2",
          "title": "Sober",
          "added-by" : "test"
        });
      expect(res.statusCode).toEqual(201);
    });

    it('should return a 400 error if we missed the URL or the title.', async () => {
      const res1 = await request(app).post('/api/zik-resources')
        .send({
          "url": "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2",
          "artist": "Tool",
          "added-by" : "test"
        });
      expect(res1.statusCode).toEqual(400);
      const res2 = await request(app).post('/api/zik-resources')
        .send({
          "title": "Sober",
          "artist": "Tool",
          "added-by" : "test"
        });
      expect(res2.statusCode).toEqual(400);
    });

    it('should return a 400 if more than 10 tags.', async () => {
      const res = await request(app).post('/api/zik-resources')
        .send({
          "url": "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2",
          "title": "Sober",
          "artist": "Tool",
          "added-by" : "test",
          "tags": [{ "label": "tag1", "value": "tag1" }, { "label": "tag2", "value": "tag2" },
          { "label": "tag3", "value": "tag3" }, { "label": "tag4", "value": "tag4" },
          { "label": "tag5", "value": "tag5" }, { "label": "tag6", "value": "tag6" },
          { "label": "tag7", "value": "tag7" }, { "label": "tag8", "value": "tag8" },
          { "label": "tag9", "value": "tag9" }, { "label": "tag10", "value": "tag10" },
          { "label": "tag11", "value": "tag11" }]

        });
      expect(res.statusCode).toEqual(400);
      // TODO: check the error message
    });

    it('should return a 201 with a complete and correct object.', async () => {
      const res = await request(app).post('/api/zik-resources')
        .send({
          "url": "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2",
          "artist": "Tool",
          "title": "Sober",
          "added-by" : "test",
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
        });
      expect(res.statusCode).toEqual(201);
    });

  });

  describe('get a zik-resource', () => {

    it('should return a 404 if the zik resource doesn\'t exists.', async () => {
      // the resource 9875ed60-d11d-4126-b7e0-56c01d9c3ea3 is not supposed in the database
      const res = await request(app).get('/api/zik-resources/9875ed60-d11d-4126-b7e0-56c01d9c3ea3');
      expect(res.statusCode).toEqual(404);
    });

    it('should return the resource with a 200 if the resource exists.', async () => {
      //TODO : get the mock
      const res = await request(app).get('/api/zik-resources/9875ed60-d11d-4126-b7e0-56c01d9c3ea3');
      expect(res.statusCode).toEqual(200);
    });

    it('should return the array of the 10 zik resources of the user TestNotEmpty.', async () => {
      const res = await request(app).get('/api/zik-resources').query('added-by=TestNotEmpty');
      expect(res.statusCode).toEqual(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(10);
    });

    it('should return [] of the user TestEmpty because has no zik resources.', async () => {
      const res = await request(app).get('/api/zik-resources').query('added-by=TestEmpty');
      expect(res.statusCode).toEqual(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(0);
    });

  });

  describe('delete a zik resource', () => {

    it('should return 204 when I delete of my zik resource', async () => {
      //TODO
      const res = await request(app).delete('/api/zik-resources/9875ed60-d11d-4126-b7e0-56c01d9c3ea3');
      expect(res.statusCode).toEqual(204);
    });

    it('should return 403 when I want delete a zik resource which is not mine', async () => {
      //TODO
      const res = await request(app).delete('/api/zik-resources/9875ed60-d11d-4126-b7e0-56c01d9c3ea3');
      expect(res.statusCode).toEqual(403);
    });

  });

});
