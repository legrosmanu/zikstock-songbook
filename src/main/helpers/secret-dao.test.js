const { SecretDAO } = require("./secret-dao");

const { DbHandlerFactory } = require('../helpers/db-handler-factory');
const { Secret } = require("./secret");

// May require additional time for downloading MongoDB binaries
jest.setTimeout(600000);

describe("Test the access to the secrets", () => {

    let daoToTest = null;
    let dbHandler = null;

    beforeAll(async () => {
        dbHandler = await DbHandlerFactory.build();
        daoToTest = new SecretDAO();
    });
    afterEach(async () => await dbHandler.clear());
    afterAll(async () => await dbHandler.close());

    it("should return the secret key if we want to build a JWT", async () => {
        // Given a secret key in the DB
        let jwtSecret = new Secret("jwt", ["my_secret_key_is_awesome"]);
        await daoToTest.collection.insertOne(jwtSecret);
        // When we ask it
        const secretKey = await daoToTest.getJwtSecret();
        // We get it
        expect(secretKey).toEqual("my_secret_key_is_awesome");
    });

});