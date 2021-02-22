const { SecretDAO } = require("./secret-dao");

const { DbHandlerFactory } = require('../helpers/db-handler-factory');
const { Secret } = require("./secret");
const { ZikStockError } = require("../zikstock-error/zikstock-error");

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

    it("should return an exception if the secret key for the JWT is not set.", async () => {
        // Given the fact we have forgotten to set the secret key in our DB
        // -> the DB is empty for example
        // When we ask it
        let error = null;
        try {
            await daoToTest.getJwtSecret();
        } catch (err) {
            error = err;
        }
        // Then we have an exception
        expect(error).not.toBeNull();
        expect(error instanceof ZikStockError).toBe(true);
        expect(error.code).toEqual("500-6");
    });

});