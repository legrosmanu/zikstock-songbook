const { DbHandlerFactory } = require('../helpers/db-handler-factory');
const { User } = require('./user');
const { UserDAO } = require('./user-dao');

// May require additional time for downloading MongoDB binaries
jest.setTimeout(600000);

describe('user-dao', () => {

    let dbHandler = null;
    let daoToTest = null;

    beforeAll(async () => {
        dbHandler = await DbHandlerFactory.build();
        daoToTest = new UserDAO();
    });
    afterEach(async () => await dbHandler.clear());
    afterAll(async () => await dbHandler.close());

    it("should create the user.", async () => {
        // Given a User with the information expected
        let newUser = new User("test@test.com", "Guitar hero", "pouet");
        // When we save it into the Database
        let userSaved = await daoToTest.create(newUser);
        // Then the user exists in the system and has an id
        expect(userSaved != null).toBe(true);
        expect(userSaved._id != null).toBe(true);
    });

    it("should retrieve the user if we have their id", async() => {
        // Given a User in the system
        let newUser = new User("test@test.com", "Guitar hero", "pouet");
        let result = await daoToTest.collection.insertOne(newUser);
        let userToTest = result.ops[0];
        let allUsers = await daoToTest.collection.find({}).toArray();
        expect(allUsers.length).toEqual(1);
        // When a we to retrieve it
        let userRetrieved = await daoToTest.retrieveOneById(String(userToTest._id));
        // Then we get the user which has the expected id
        expect(userRetrieved != null).toBe(true);
        expect(userRetrieved._id.equals(userToTest._id)).toBe(true);
    });

    it("should retrieve the user if we have their email", async() => {
        // Given a User in the system
        let newUser = new User("test@test.com", "Guitar hero", "pouet");
        let result = await daoToTest.collection.insertOne(newUser);
        let userToTest = result.ops[0];
        let allUsers = await daoToTest.collection.find({}).toArray();
        expect(allUsers.length).toEqual(1);
        // When a we to retrieve it
        let userRetrieved = await daoToTest.retrieveOneByEmail(String(userToTest.email));
        // Then we get the user which has the expected id
        expect(userRetrieved != null).toBe(true);
        expect(userRetrieved.email).toEqual(userToTest.email);
    });

});