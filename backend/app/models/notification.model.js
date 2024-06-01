const {Schema, model} = require('mongoose');


const notificationSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipients: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    notificationType: {
        type: String,
        enum: ['story', 'comment' , 'follow' , 'like'], // Add more types as needed
        required: true
    },
    storyId: {
        type: Schema.Types.ObjectId,
        ref: 'Story',
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    },
});

const Notification = model('Notification', notificationSchema);

module.exports = Notification
