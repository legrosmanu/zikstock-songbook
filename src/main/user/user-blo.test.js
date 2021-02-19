const mockRetrieveOneByEmail = jest.fn();
jest.mock('./user-dao', () => {
    return {
        UserDAO: jest.fn().mockImplementation(() => {
            return {
                retrieveOneByEmail: mockRetrieveOneByEmail
            }
        }),
    };
});
const { ZikStockError } = require("../zikstock-error/zikstock-error");
const { UserBLO } = require("./user-blo");

describe('user-blo', () => {

    let bloToTest = null;

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
        expect(error instanceof ZikStockError).toBe(true);
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
        expect(error instanceof ZikStockError).toBe(true);
        expect(error.code).toEqual("400-3");
    });

    it("should not create the user because the email si not valid", async () => {
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
        expect(error instanceof ZikStockError).toBe(true);
        expect(error.code).toEqual("400-4");
    });

});
