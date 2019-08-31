const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../src/index').app;
let server = require('../src/index').server;

chai.use(chaiHttp);

after(() => { server.close(); });

describe('The health check', function () {
  it("should exist", (done) => {
    chai.request(server).get('/health-check').end((err, res) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
  it("should be ok", (done) => {
    chai.request(server).get('/health-check').end((err, res) => {
      let statusIsOk = { status : "ok" };
      expect(res.body).to.eql(statusIsOk);
      done();
    });
  })
});
