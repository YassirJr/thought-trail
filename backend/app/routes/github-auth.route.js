var express = require('express');
const passport = require("passport")
var router = express.Router();

router.get('/', passport.authenticate('github' ,{prompt: 'select_account'})); //, {scope : ["user:email"]}

router.get(
    '/callback',
    passport.authenticate('github', {failureRedirect: process.env.CLIENT_URL + '/auth'}),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect(process.env.CLIENT_URL + "/account/admin")
    }
);
module.exports = router;








Î