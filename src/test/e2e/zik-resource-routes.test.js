const request = require('supertest');
const app = require('../../main/server.js');
const ZikResourceRoutes = require('../../main/api/zik-resource-routes');

describe('zik-resource-routes', () => {

  describe('create a zik-resource', () => {

    it('should return a 201 just with an URL and a title.', async () => {
      const res = await request(app).post('/api/zik-resources')
        .send({
          "url": "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2",
          "title": "Sober"
        });
      expect(res.statusCode).toEqual(201);
    });

    it('should return a 400 error if we missed the URL or the title.', async () => {
      const res1 = await request(app).post('/api/zik-resources')
        .send({
          "url": "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2",
          "artist": "Tool"
        });
      expect(res1.statusCode).toEqual(400);
      const res2 = await request(app).post('/api/zik-resources')
        .send({
          "title": "Sober",
          "artist": "Tool"
        });
      expect(res2.statusCode).toEqual(400);
    });

    it('should return a 400 if more than 10 tags.', async () => {
      const res = await request(app).post('/api/zik-resources')
        .send({
          "url": "https://www.songsterr.com/a/wsa/tool-sober-tab-s19923t2",
          "title": "Sober",
          "artist": "Tool",
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

    it('should return a 201 with a complete object.', async () => {
      const res = await request(app).post('/api/zik-resources')
        .send({
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
        });
      expect(res.statusCode).toEqual(201);
    });

  });

  describe('get a zik-resource', () => {

    it('should return a 404 if the zik resource doesn\'t exists.', async () => {
      const res = await request(app).get('/api/zik-resources/0');
      expect(res.statusCode).toEqual(404);
    });

    it('should return the resource with a 200 if the resource exists.', async () => {
      //TODO : get the mock
      const res = await request(app).get('/api/zik-resources/0');
      expect(res.statusCode).toEqual(200);
    });

    it('should return a [] when we want to get the zik resources of an unkown user.', async () => {
      const res = await request(app).get('/api/zik-resources/0').query('added-by=notUser');
      expect(res.statusCode).toEqual(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(0);
    });

    it('should return the array of the 10 zik resources of the user TestNotEmpty.', async () => {
      const res = await request(app).get('/api/zik-resources/0').query('added-by=TestNotEmpty');
      expect(res.statusCode).toEqual(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(10);
    });

    it('should return [] of the user TestEmpty because has no zik resources.', async () => {
      const res = await request(app).get('/api/zik-resources/0').query('added-by=TestEmpty');
      expect(res.statusCode).toEqual(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(0);
    });

  });

  describe('delete a zik resource', () => {

    it('should return 204 when I delete of my zik resource', async () => {
      //TODO
      expect(res.statusCode).toEqual(204);
    });

    it('should return 403 when I want delete a zik resource which is not mine', async () => {
      //TODO
      expect(res.statusCode).toEqual(403);
    });

  });

});
