const {model, Schema} = require("mongoose")


const StorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    },
    official_photo: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    tags : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tag',
        }
    ],
    likes : [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ]

});

const Story = model('Story', StorySchema)

module.exports = Story