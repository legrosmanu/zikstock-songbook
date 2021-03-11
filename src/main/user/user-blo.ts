import { AppError } from "../spot4zik-error/app-error";
import { User, UserWithoutPassword } from "./user";
import { UserDAO } from "./user-dao";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SecretDAO } from "../helpers/secret-dao";

export class UserBLO {

    userDAO: UserDAO;
    secretsDao: SecretDAO;

    constructor() {
        this.userDAO = new UserDAO();
        this.secretsDao = new SecretDAO();
    }

    async createUser(data: any): Promise<User> {
        if (!this.emailIsValide(data.email)) {
            throw new AppError("400-4");
        }
        if (!this.passwordIsValid(data.password)) {
            throw new AppError("400-3");
        }
        const existingUser = await this.userDAO.retrieveOneByEmail(data.email);
        if (existingUser != null) {
            throw new AppError("409-1");
        }
        const encryptedPassword = await this.encryptPassword(data.password);
        const newUser = new User(data.email, data.displayName, encryptedPassword);
        return await this.userDAO.create(newUser);
    }

    async canLogIn(email: string, password: string): Promise<User | null> {
        const existingUser = await this.userDAO.retrieveOneByEmail(email);
        let userCanLogIn = null;
        if (existingUser != null) {
            if (await bcrypt.compare(password, existingUser.password)) {
                userCanLogIn = existingUser;
            }
        }
        return userCanLogIn;
    }

    async encryptPassword(password: string): Promise<string> {
        let round = 12;
        if (process.env.BCRYPT_ROUND) {
            round = +process.env.BCRYPT_ROUND;
        }
        let encryptedPassword = await bcrypt.hash(password, round);
        return encryptedPassword;
    }

    async getToken(user: any): Promise<jwt.Secret | null> {
        const secretKey = await this.secretsDao.getJwtSecret();
        let jwtSecret = null;
        if (secretKey) {
            const userWithoutPassword = new UserWithoutPassword(user);
            jwtSecret = jwt.sign({userWithoutPassword}, secretKey, { expiresIn: 3600 });
        }
        return jwtSecret;
    }

    private emailIsValide(email: string): boolean {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
    }

    // check if the password is enough good
    // Between 8 and 32 characters
    // At least one lowcase and one uppercase
    // At least one number
    // At least one special character
    // No other kind of characters than alpha-num
    private passwordIsValid(password: string): boolean {
        return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_#])([-+!*$@%_#\w]{8,32})$/.test(password);
    }

}