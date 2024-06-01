const {Schema, model} = require('mongoose')

const readNotificationSchema = new Schema({
    user:
        {
            type: Schema.Types.ObjectId,
            ref: 'User', required: true
        },
    notification:
        {
            type: Schema.Types.ObjectId,
            ref: 'Notification',
            required: true
        },
    readAt:
        {
            type: Date,
            default: Date.now
        },
});

const ReadNotification = model('ReadNotification', readNotificationSchema);
module.exports = ReadNotification

