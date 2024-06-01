var express = require('express');
const {isLoggedIn} = require("../middlewares/is-logged-in.middleware");
const {index, store, getAll, update, destroy , saveStory , deleteSavedStory, getSavedStories, addLike , removeLike} = require("../controllers/story.controller");
const {storyRequest} = require("../requests/story.request");
const {upload} = require("../config/multer.config");
const {isAuthorizedToEditStory} = require("../middlewares/is-allowed-to-edit-story.middleware");
const {isAllowedToDeleteStory} = require("../middlewares/is-allowed-to-delete-story.middleware");
var router = express.Router();

router.use(isLoggedIn)
router.get('/', index)
router.get('/all', getAll)
router.post('/', upload.single('official_photo'), storyRequest, store);
router.put('/:id', upload.single('official_photo'), [isAuthorizedToEditStory, storyRequest], update)
router.delete('/:id', isAllowedToDeleteStory, destroy)

router.get('/saved' , getSavedStories)
router.post('/save' , saveStory)
router.delete('/saved/:id' , deleteSavedStory)

router.post('/add-like' , addLike)
router.delete('/remove-like/:id' , removeLike)

module.exports = router;