const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Lecturer = mongoose.model("lecturers");
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Lecturer.findById(jwt_payload.id)
        .then(lecturer => {
          if (lecturer) {
            return done(null, lecturer);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
