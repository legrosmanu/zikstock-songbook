import passport from "passport";
import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
import passportJWT from 'passport-jwt';
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
import { UserBLO } from "./user-blo";
import { UserDAO } from "./user-dao";
import { NextFunction } from "express";
import { AppError } from "../spot4zik-error/app-error";

export const getLocalStrategy = () => {
    return new LocalStrategy(
        async (username: string, password: string, done) => {
            try {
                const userBLO = new UserBLO();
                const existingUser = await userBLO.canLogIn(username, password);
                if (existingUser == null) {
                    return done(null, false);
                }
                return done(null, existingUser);
            } catch (err) {
                return done(err);
            }
        }
    );
};

export const getJwtStrategy = (secretKey: string) => {
    return new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: secretKey
        },
        async (jwtPayload, done) => {
            try {
                const userDao = new UserDAO();
                const user = await userDao.retrieveOneById(jwtPayload.userWithoutPassword._id);
                return done(null, user);
            } catch (err) {
                return done(new AppError('401-1'));
            }
        }
    );
};

export const localAuthentication = passport.authenticate('local', { session: false });

let jwtAuthenticationFactory;
if (process.env.NODE_ENV !== 'test') {
    jwtAuthenticationFactory = passport.authenticate('jwt', { session: false });
} else { // In case of unit tests, we don't want to apply the JWT check
    jwtAuthenticationFactory = (err: any, req: any, res: any, next: NextFunction) => {  next(); };
}
export const jwtAuthentication = jwtAuthenticationFactory;