import { ZikStockError } from "../zikstock-error/zikstock-error";
import { User } from "./user";
import { UserDAO } from "./user-dao";
import * as bcrypt from 'bcrypt';

export class UserBLO {

    userDAO: UserDAO;

    constructor() {
        this.userDAO = new UserDAO();
    }

    async createUser(data: any): Promise<User> {
        if (!this.emailIsValide(data.email)) {
            throw new ZikStockError("400-4");
        }
        if (!this.passwordIsValid(data.password)) {
            throw new ZikStockError("400-3");
        }
        const existingUser = await this.userDAO.retrieveOneByEmail(data.email);
        if (existingUser != null) {
            throw new ZikStockError("409-1");
        }
        const encryptedPassword = await this.encryptPassword(data.password);
        const newUser = new User(data.email, data.displayName, encryptedPassword);
        return await this.userDAO.create(newUser);
    }

    async canLogIn(email: string, password: string): Promise<User|null> {
        const existingUser = await this.userDAO.retrieveOneByEmail(email);
        let userCanLogIn = null;
        if (existingUser != null) {
            const encryptedPassword = await this.encryptPassword(password);
            if (encryptedPassword === existingUser.password) {
                userCanLogIn = existingUser;
            }
        }
        return userCanLogIn;
    }

    private emailIsValide(email: string): boolean {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
    }

    // check if the password is enough good
    // Between 8 and 15 characters
    // At least one lowcase and one uppercase
    // At least one number
    // At least one special character
    // No other kind of characters than alpha-num
    private passwordIsValid(password: string): boolean {
        return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/.test(password);
    }

    private async encryptPassword(password: string): Promise<string> {
        let encryptedPassword = await bcrypt.hash(password, 12);
        return encryptedPassword;
    }

}