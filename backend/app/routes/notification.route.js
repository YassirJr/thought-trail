var express = require('express');
const {isLoggedIn} = require("../middlewares/is-logged-in.middleware");
const {index, markAsRead, markAllAsRead} = require("../controllers/notification.controller");
var router = express.Router();

router.use(isLoggedIn)
router.get('/', index)
router.post('/mark-as-read' , markAsRead)
router.post('/mark-all-as-read' , markAllAsRead)

module.exports = router;