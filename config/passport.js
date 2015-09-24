var passport = require("passport");
var FacebookStrategy = require("passport-facebook");
var mongoose = require("mongoose");
var User = mongoose.model("User");

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(obj, done){
    done(null, obj);
});


passport.use(new FacebookStrategy({
    clientID: "1652746914943380",
    clientSecret: "493c3729b44c9cd5a526e8a96530c601",
    callbackURL: "http://localhost:3000/v1/api/auth/facebook/callback",
    passReqToCallback: true,
    profileFields: ['id', 'name', 'emails', 'photos']
  },
  function(req, accessToken, refreshToken, profile, done) {
    User.findOne({ facebookId: profile.id }, function (err, user) {
      if(err) return done(err, null);
      if(user) {
          console.log("Current User, Logging In");
          return done(null, user);
      } else {
          console.log("New User, Registering and Logging In");
          var userModel = new User();
          if(profile.emails) {
              userModel.email = profile.emails[0].value;
          } else {
              userModel.email = profile.username + "@facebook.com";
          }
          userModel.facebookId = profile.id;
          userModel.displayName = profile.name.givenName + " " + profile.name.familyName;
          userModel.save(function(err, userSaved) {
              if(err) {
                  return err;
              }
              return(err, userSaved);
          })
      }
    });
  }
));
