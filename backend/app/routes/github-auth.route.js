var express = require('express');
const passport = require("passport")
var router = express.Router();

router.get('/', passport.authenticate('github' ,{prompt: 'select_account'})); //, {scope : ["user:email"]}

router.get(
    '/callback',
    passport.authenticate('github', {failureRedirect: 'http://localhost:3000/auth'}),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect("http://localhost:3000/account/admin")
    }
);
module.exports = router;








