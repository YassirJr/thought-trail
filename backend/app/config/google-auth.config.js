const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/user.model");

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, cb) {
        try {
            let user = await User.findOne({googleId: profile.id});
            if (!user) {
                user = new User({
                    email: profile.emails[0].value,
                    fname: profile.name.familyName,
                    lname: profile.name.givenName,
                    photo: profile.photos[0].value,
                    googleId: profile.id
                });
                await user.save();
            }
            return cb(null, user);
        } catch (err) {
            return cb(err);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user); // Serialize user ID
});

passport.deserializeUser((user, done) => {
    done(null, user); // Serialize user ID
});
