var express = require('express');
const {isLoggedIn} = require("../middlewares/is-logged-in.middleware");
const {updateProfile} = require("../controllers/profile.controller");
const {upload} = require("../config/multer.config");
var router = express.Router();

router.use(isLoggedIn)
router.post('/', upload.single('photo'), updateProfile);

module.exports = router;