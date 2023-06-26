import passport from 'passport';
import passportJwt from 'passport-jwt';
import { ExtractJwt, Strategy } from 'passport-jwt';
import db from '../models';
import { verify } from 'jsonwebtoken';

passport.use(
    new Strategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "12345",
    }, (jwtPayLoad: any, done: any) => {
        return db.User.findOne({
            where: {
                id: jwtPayLoad.id
            }
        })
            .then((user: any) => {
                return done(null, user);
            })
            .catch((err: Error) => {
                return done(err);
            });
    })
);


