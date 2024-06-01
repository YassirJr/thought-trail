const {model , Schema} = require("mongoose")
const CommentSchema = new Schema({
    story: {
        type: Schema.Types.ObjectId,
        ref: 'Story',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Comment = model('Comment', CommentSchema)
module.exports = Comment

