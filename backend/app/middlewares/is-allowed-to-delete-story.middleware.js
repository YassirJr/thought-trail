const Story = require('../models/story.model')

const isAllowedToDeleteStory = async (req, res, next) => {
    const storyId = req.params.id;
    const userId = req.user._id; // Assuming the authenticated user's ID is stored in req.user._id

    try {
        const story = await Story.findById(storyId).populate('user');

        if (!story) {
            return res.status(404).json({ error: 'Story not found' });
        }

        if (story.user._id.toString() !== userId.toString()) {
            return res.status(403).json({ error: 'You are not authorized to delete this story' });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    isAllowedToDeleteStory
}