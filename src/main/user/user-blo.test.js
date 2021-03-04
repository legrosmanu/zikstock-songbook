const mockRetrieveOneByEmail = jest.fn();
jest.mock('../helpers/secret-dao');
jest.mock('./user-dao', () => {
    return {
        UserDAO: jest.fn().mockImplementation(() => {
            return {
                retrieveOneByEmail: mockRetrieveOneByEmail
            }
        }),
    };
});
const { AppError } = require("../spot4zik-error/app-error");
const { User } = require("./user");
const { UserBLO } = require("./user-blo");
const bcrypt = require('bcrypt');

describe('user-blo', () => {

    let bloToTest = null;
    process.env.BCRYPT_ROUND = 2;

    beforeAll(async () => {
        bloToTest = new UserBLO();
    });

    it("should not create the user because the email is already used", async () => {
        // Given a user which has an email already used
        let data = {
            email: "test@test.com",
            displayName: "Unit Test",
            password: "TestPourVoir@21"
        };
        mockRetrieveOneByEmail.mockImplementation(() => {
            return {};
        });
        // When we try to create / add to the system
        let error = null;
        try {
            await bloToTest.createUser(data);
        } catch (err) {
            error = err;
        }
        // Then we have a functionnal exception
        expect(error instanceof AppError).toBe(true);
        expect(error.code).toEqual("409-1");
    });

    it("should not create the user because the password doesn't respect the security rules", async () => {
        // Given a a password which doesn't respect the security rules
        let data = {
            email: "test@test.com",
            displayName: "Unit Test",
            password: "test"
        };
        mockRetrieveOneByEmail.mockImplementation(() => {
            return null;
        });
        // When we try to create / add to the system
        let error = null;
        try {
            await bloToTest.createUser(data);
        } catch (err) {
            error = err;
        }
        // Then we have a functionnal exception
        expect(error instanceof AppError).toBe(true);
        expect(error.code).toEqual("400-3");
    });

    it("should not create the user because the email is not valid", async () => {
        // Given a a password which doesn't respect the security rules
        let data = {
            email: "test.test.com",
            displayName: "Unit Test",
            password: "TestPourVoir@21"
        };
        mockRetrieveOneByEmail.mockImplementation(() => {
            return null;
        });
        // When we try to create / add to the system
        let error = null;
        try {
            await bloToTest.createUser(data);
        } catch (err) {
            error = err;
        }
        // Then we have a functionnal exception
        expect(error instanceof AppError).toBe(true);
        expect(error.code).toEqual("400-4");
    });

    it("should return null when we check a user can log in, if the user does'nt exist", async () => {
        // Given an unknown user
        mockRetrieveOneByEmail.mockImplementation(() => {
            return null;
        });
        // When we check if he can log in
        const userWhichCanLogIn = await bloToTest.canLogIn("fakeEmail", "fakePassword");
        // Then the user returned is null
        expect(userWhichCanLogIn).toBeNull();
    });

    it("should return the user known when we check this user can log in", async () => {
        // Given a known user, with the good password
        const user = new User("test@test.com", "Unit Test", "TestPourVoir@21");
        mockRetrieveOneByEmail.mockImplementation(async () => {
            const userWithPasswordEncrypted = new User(user.email, user.displayName, user.password);
            userWithPasswordEncrypted.password = await bloToTest.encryptPassword(user.password);
            return userWithPasswordEncrypted;
        });
        // When we check if he can log in
        const userWhoCanLogIn = await bloToTest.canLogIn(user.email, user.password);
        // Then the user returned is not null
        expect(userWhoCanLogIn).not.toBeNull();
        // And we have the user expected
        expect(user.email).toEqual(userWhoCanLogIn.email);
        expect(user.displayName).toEqual(userWhoCanLogIn.displayName);
    });

    it("should encrypt a password as expected", async () => {
        // Given a password
        const password = "What@password2021";
        // When we encrypt it
        const passwordEncrypted = await bloToTest.encryptPassword(password);
        // Then 
        expect (await bcrypt.compare(password, passwordEncrypted)).toBe(true);
    });

});
