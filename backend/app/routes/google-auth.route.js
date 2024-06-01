var express = require('express');
const passport = require("passport")


var router = express.Router();

router.get('/',
    passport.authenticate('google', {scope: ['email','profile']}));

router.get('/callback',
    passport.authenticate('google', {failureRedirect: 'http://localhost:3000/auth'}),
    (req, res) => {
        res.redirect("http://localhost:3000/account/admin")
    });


module.exports = router;