var express = require('express');
const { findAll, findOne, me } = require("../controllers/users.controller");
const { isLoggedIn } = require("../middlewares/is-logged-in.middleware");
var router = express.Router();


router.get('/me', isLoggedIn , me)
router.get('/', findAll);
router.get('/:id', findOne);

module.exports = router;