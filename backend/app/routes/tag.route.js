var express = require('express');
const {isLoggedIn} = require("../middlewares/is-logged-in.middleware");
const {index} = require("../controllers/tag.controller");
var router = express.Router();

router.use(isLoggedIn)
router.get('/', index)

module.exports = router;