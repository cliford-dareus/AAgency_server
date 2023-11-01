import JwtStrategy from "passport-jwt";
import passport from "passport";

import prisma from "../lib/prisma";
import { PassportOptions } from "../utils/interfaces";
import { Request } from "express";

const JwtStrategies = JwtStrategy.Strategy;

const cookieExtractor = function (req: Request) {
  var token = null;
  if (req && req.cookies) token = req.signedCookies["access_token"];
  return token;
};

var opts = {} as PassportOptions;

opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET!;

passport.use(
  new JwtStrategies(opts, function (jwt_payload, done) {
    console.log(jwt_payload)
    prisma.user
      .findUnique({ where: { id: jwt_payload.id } })
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      })
      .catch((err) => {
        console.log(err);
        return done(err, false);
      });
  })
);
