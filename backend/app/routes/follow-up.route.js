var express = require('express');
const {isLoggedIn} = require("../middlewares/is-logged-in.middleware");
const {getFollowers, getFollowings, follow, unfollow} = require("../controllers/follow-up.controller");
var router = express.Router();

router.use(isLoggedIn)
router.get('/followers', getFollowers)
router.get('/followings' , getFollowings)
router.post('/follow' , follow)
router.post('/unfollow' , unfollow)

module.exports = router;