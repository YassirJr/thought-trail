const Story = require('../models/story.model')

const isAuthorizedToEditStory = async (req, res, next) => {
    const storyId = req.params.id;
    const userId = req.user._id; // Assuming the authenticated user's ID is stored in req.user._id

    try {
        const story = await Story.findById(storyId).populate('user');

        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }

        if (story.user._id.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You are not authorized to edit this story' });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    isAuthorizedToEditStory
}