var express = require('express');
const {signInRequest} = require("../requests/signin.request");
const {signUpRequest} = require("../requests/signup.request");
const {signup, signin} = require("../controllers/auth.controller");
const {isLoggedIn} = require("../middlewares/is-logged-in.middleware");


var router = express.Router();

router.post('/signin', signInRequest, signin);
router.post('/signup', signUpRequest, signup);

router.post("/logout", isLoggedIn, (req, res) => {
    req.logout(() => {}); // Add a dummy callback function
    // req.session.destroy(()=>{}); // Destroy the session
    return res.status(200).json({ message: "successfully logged out" });
});


module.exports = router;