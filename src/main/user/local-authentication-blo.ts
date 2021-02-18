//import passport from 'passport';
import passportLocal from 'passport-local';
//const LocalStrategy = passportLocal.Strategy;

export class LocalAuthenticationBLO {

    email: string;
    password: string;
    
    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    signUp() {

    }

    signIn() {

    }

}