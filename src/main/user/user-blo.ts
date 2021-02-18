import { ZikStockError } from "../zikstock-error/zikstock-error";
import { User } from "./user";
import { UserDAO } from "./user-dao";
import * as bcrypt from 'bcrypt';

export class UserBLO {

    userDao: UserDAO;

    constructor() {
        this.userDao = new UserDAO();
    }

    async createUser(data: any): Promise<User> {
        // check if the email is already used
        const existingUser = await this.userDao.retrieveOneByEmail(data.email);
        if (existingUser != null) {
            throw new ZikStockError("409-1");
        }
        if (!this.passwordIsValid(data.password)) {
            throw new ZikStockError("400-3");
        }
        const encryptedPassword = await this.encryptPassword(data.password);
        const newUser = new User(data.email, data.displayName, encryptedPassword);
        return await this.userDao.create(newUser);
    }

    // check if the password is enough good
    // Between 8 and 15 characters
    // At least one lowcase and one uppercase
    // At least one number
    // At least one special character
    // No other kind of characters than alpha-num
    private passwordIsValid(password: string): boolean {
        //eslint-disable-next-line
        const regExp = new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$");
        return regExp.test(password);
    }

    private async encryptPassword(password: string): Promise<string> {
        let encryptedPassword = await bcrypt.hash(password, 12);
        return encryptedPassword;
    }

}