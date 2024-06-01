const Story = require('../models/story.model')
const User = require('../models/user.model')
const SavedStory = require('../models/saved-story.model')
const {store: storeNewNotification} = require('../controllers/notification.controller')
const {guessTag} = require("./tag.controller");
const {store: storeNewTag} = require('../controllers/tag.controller')
const {httpStatus} = require("../constants/index.constants");


const index = async (req, res) => {
    try {
        const user = req.user._id
        const posts = await Story.find({user}).populate('tags')
        return res.status(httpStatus.OK)
            .json({
                success: true, data: posts
            })

    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({
                success: false, errors: [e.message]
            })
    }
}


const getAll = async (req, res) => {
    const randomStories = await Story.aggregate([{$sample: {size: await Story.countDocuments()}}]);
    const stories = await Story.populate(randomStories, ['user', 'tags'])
    return res.status(httpStatus.OK)
        .json({
            success: true, data: stories
        })
}

const store = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No official photo were uploaded.');
        }
        const {body} = req;
        const content = body?.content;
        const guestedTags = await guessTag(content);
        const storyTags = await storeNewTag(guestedTags);
        const official_photo = `${process.env.STORAGE_URL}${req.file.filename}`;
        const newStory = new Story({...body, official_photo, tags: storyTags});
        await newStory.save();
        await storeNewNotification({
            senderId: req.user?._id,
            title: newStory?.title, storyId: newStory._id
        })
        res.status(httpStatus.CREATED).json({
            success: true,
            message: "Story created successfully"
        });
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            errors: [err.message]
        });
    }
}

const update = async (req, res) => {
    const {body} = req;
    const {id: storyId} = req.params;
    const isRequestHasFile = !!req.file;

    try {
        const updatedData = isRequestHasFile
            ? {...body, official_photo: `${process.env.STORAGE_URL}${req.file.filename}`}
            : body;

        const updatedStory = await Story.findByIdAndUpdate(storyId,
            {$set: updatedData}, {new: true});

        res.status(httpStatus.OK).json({
            message: 'Story updated successfully.',
            data: updatedStory
        });
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            errors: [err.message]
        });
    }
}

const destroy = async (req, res) => {
    const {id: storyId} = req.params
    try {
        const deletedStory = await Story.findByIdAndDelete(storyId)
        return res.status(httpStatus.OK).json({
            success: true, message: 'Story deleted successfully'
        })
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, errors: [err.message]
        })
    }

}

const getSavedStories = async (req, res) => {
    const userId = req.user?._id
    try {
        const savedStories = await SavedStory.find({user: userId})
            .populate({
                path: 'story',
                populate: {
                    path: 'user',
                    model: 'User' // assuming the author is referenced in the User model
                }
            })
            .populate('user')
        return res.status(httpStatus.OK).json({
            success: true,
            data: savedStories
        })
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, errors: [err.message]
        })
    }
}

const saveStory = async (req, res) => {
    const user = req.user?._id
    const {story} = req.body
    try {
        const isSaved = await SavedStory.findById(story)
        if (!isSaved) {
            const newSavedStory = new SavedStory({
                user,
                story
            })
            await newSavedStory.save()
            return res.status(httpStatus.CREATED).json({
                success: true,
                message: 'story saved successfully'
            })
        } else {
            return res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: 'story already saved'
            })
        }
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, errors: [err.message]
        })
    }
}

const deleteSavedStory = async (req, res) => {
    const user = req.user?._id
    const story = req.params.id

    try {
        const deletedStory = await SavedStory.findOneAndDelete({user, story})
        return res.status(httpStatus.OK).json({
            success: true, message: 'Saved story deleted successfully'
        })
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, errors: [err.message]
        })
    }
}

const addLike = async (req, res) => {
    try {
        const userId = req.user?._id
        const {storyId} = req.body
        const user = await User.findById(userId);
        const story = await Story.findById(storyId);
        if (!story) {
            return res.status(httpStatus.NOT_FOUND)
                .json(
                    {
                        success: false,
                        message: 'Story not found'
                    }
                )
        }

        if (story.likes.includes(userId)) {
            return res.status(httpStatus.BAD_REQUEST)
                .json(
                    {
                        success: false,
                        message: 'You are already liked this story'
                    }
                )
        }
        story.likes.push(userId);
        await story.save();
        await storeNewNotification(
            {
                senderId: userId,
                title: `${user.fname} ${user.lname} liked you story`,
                recipients: [story.user?._id],
                notificationType: 'like'
            }
        )
        return res.status(httpStatus.CREATED)
            .json(
                {
                    success: true,
                    message: 'like added to this story.'
                }
            )
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR)
            .json(
                {
                    success: false,
                    errors: [
                        `Failed to add like: ${error.message}`
                    ]
                }
            )
    }
};

const removeLike = async (req, res) => {
    try {
        const userId = req.user?._id
        const {id} = req.params
        const story = await Story.findById(id);
        if (!story) {
            return res.status(httpStatus.NOT_FOUND)
                .json(
                    {
                        success: false,
                        message: 'Story not found'
                    }
                )
        }

        // Check if the user has liked the story
        const likeIndex = story.likes.indexOf(userId);
        if (likeIndex === -1) {
            return res.status(httpStatus.BAD_REQUEST)
                .json(
                    {
                        success: false,
                        message: 'You are not liked this story'
                    }
                )

        }
        story.likes.splice(likeIndex, 1);
        await story.save();
        return res.status(httpStatus.OK)
            .json(
                {
                    success: true,
                    message: 'Your like is removed from this story'
                }
            )
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR)
            .json(
                {
                    success: false,
                    errors: [
                        `Failed to remove like: ${error.message}`
                    ]
                }
            )
    }
};


module.exports = {
    index,
    getAll,
    store,
    update,
    destroy,
    getSavedStories,
    saveStory,
    deleteSavedStory,
    addLike,
    removeLike
}