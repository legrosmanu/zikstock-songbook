const request = require('supertest');
jest.mock('../zikresource/zikresource-blo');
const mockCanLogIn = jest.fn();
const mockGetToken = jest.fn();
const mockCreateUser = jest.fn();
jest.mock('./user-blo', () => {
    return {
        UserBLO: jest.fn().mockImplementation(() => {
            return {
                canLogIn: mockCanLogIn,
                getToken: mockGetToken,
                createUser: mockCreateUser
            };
        })
    };
});
const app = require('../app');
const { User } = require('./user');

describe('POST /login', () => {

    it('should return a 401 when the login is not ok', async () => {
        // Given bad credentials
        const badCredentials = {
            username: 'pouet@pouet.com',
            password: 'test'
        }
        mockCanLogIn.mockImplementation(() => {
            return null;
        });
        // When they give the good credentiels
        const res = await request(app).post('/api/users/login').send(badCredentials);
        // Then the log in is ok
        expect(res.statusCode).toEqual(401);
    });

    it('should return a 200 when the login is ok', async () => {
        // Given good credentials (so the BLO have returned a user and the token)
        const fakeCredentials = {
            username: 'fake@pouet.com',
            password: 'fake'
        }
        mockCanLogIn.mockImplementation(() => {
            return new User(fakeCredentials.username, "fake displayname", fakeCredentials.password);
        });
        mockGetToken.mockImplementation(() => {
            return "fakeToken";
        });
        // When they give the good credentiels
        const res = await request(app).post('/api/users/login').send(fakeCredentials);
        // Then the log in is ok (HTTP 200 and the token in the body)
        expect(res.statusCode).toEqual(200);
        expect(res.body).not.toBeNull();
    });

    it('should return a user without the password when we create a user', async () => {
        // Given a user saved in the system
        const fakeUser = new User("fakeUser", "Fake User", "Fake password");
        mockCreateUser.mockImplementation(() => {
            return new User("fakeUser", "Fake User", "Fake password");
        });
        // When we create the user
        const res = await request(app).post('/api/users').send(fakeUser);
        // Then we send a User without a password
        expect(res.statusCode).toEqual(201);
        expect(res.body).not.toBeNull();
        expect(res.body.password === undefined).toBe(true);
    });

});
