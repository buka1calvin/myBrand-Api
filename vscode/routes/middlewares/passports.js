import passportJwt from "passport-jwt";
import dotenv from "dotenv";

dotenv.config();

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.TOKEN_KEY,
};
export const jwtStrategy = new JwtStrategy(options, (payload, done) => {
  return done(null, { userId: payload.userId });
});