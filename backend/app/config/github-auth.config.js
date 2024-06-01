const GithubStrategy = require("passport-github2").Strategy;
const passport = require("passport");
const User = require("../models/user.model");

passport.use(new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
    },

    async function (accessToken, refreshToken, profile, cb) {
        try {
            let user = await User.findOne({githubId: profile.id});
            if (!user) {
                user = new User({
                    email: profile?._json.email || "example@gmail.com" ,
                    fname: profile.displayName,
                    lname: profile.displayName,
                    photo: profile.photos[0].value,
                    githubId: profile.id
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
