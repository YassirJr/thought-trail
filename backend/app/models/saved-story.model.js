// models/SavedPost.model.js
const mongoose = require('mongoose');
const {model} = require("mongoose");
const Schema = mongoose.Schema;

const savedStorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    story: {
        type: Schema.Types.ObjectId,
        ref: 'Story',
        required: true
    },
    savedAt: {
        type: Date,
        default: Date.now
    }
});

const SavedPosts = model('SavedStory', savedStorySchema);
module.exports = SavedPosts
