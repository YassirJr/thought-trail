var express = require('express');
const passport = require("passport")


var router = express.Router();

router.get('/',
    passport.authenticate('google', {scope: ['email','profile']}));

router.get('/callback',
    passport.authenticate('google', {failureRedirect: process.env.CLIENT_URL+'/auth'}),
    (req, res) => {
        res.redirect(process.env.CLIENT_URL+"/account/admin")
    });


module.exports = router;