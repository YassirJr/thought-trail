const Notification = require('../models/notification.model')
const ReadNotification = require('../models/read-notification.model')
const User = require("../models/user.model");
const {httpStatus} = require("../constants/index.constants");

const index = async (req, res) => {
    const recipients = req.user?._id
    const notifications =
        await Notification
            .find({recipients})
            .populate('sender');

    const readNotifications =
        await ReadNotification
            .find({user: recipients})
            .select('notification');

    const readNotificationIds =
        readNotifications.map(readNotification =>
            readNotification.notification.toString());

    const unreadNotifications = notifications
        .filter(notification =>
            !readNotificationIds.includes(notification._id.toString()))
        .map(notification => ({
            _id: notification._id,
            message: notification.message,
            storyId: notification?.storyId,
            createdAt: notification.createdAt,
            sender: notification.sender,
            type: notification.notificationType
        }))

    res.status(httpStatus.OK).json(
        {
            success: true, data: unreadNotifications
        }
    );
}

const store = async ({senderId, title, recipients, notificationType}) => {
    try {
        const sender = await User.findById(senderId)
        const users = await User.find()

        const notification = new Notification(
            {
                message: title,
                sender: senderId,
                recipients,
                notificationType
            }
        );
        await notification.save();
    } catch (e) {
        // console.log(e)
    }
}

const markAsRead = async (req, res) => {
    try {

        const userId = req.user._id;
        const {body: {_id}} = req;
        // Check if the notification exists
        const notification = await Notification.findById(_id);
        if (!notification) {
            return res
                .status(httpStatus.NOT_FOUND)
                .json(
                    {
                        error: 'Notification not found'
                    }
                );
        }

        // Check if the user is a recipient of the notification
        if (!notification.recipients.includes(userId)) {
            return res
                .status(httpStatus.FORBIDDEN)
                .json(
                    {
                        error: 'User is not a recipient of this notification'
                    }
                );
        }

        // Check if the notification is already marked as read
        const alreadyRead = await
            ReadNotification.findOne({user: userId, notification: _id});
        if (alreadyRead) {
            return res
                .status(400)
                .json(
                    {
                        error: 'Notification already marked as read'
                    }
                );
        }

        // Mark the notification as read
        const readNotification = new ReadNotification(
            {
                user: userId,
                notification: _id,
                readAt: Date.now()
            });

        await readNotification.save();
        return res
            .status(httpStatus.OK)
            .json(
                {
                    message: 'Notification marked as read'
                }
            );
    } catch (error) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json(
                {
                    error: 'Server error'
                }
            );
    }
}

const markAllAsRead = async (req, res) => {
    try {
        const userId = req.user._id;

        const unreadNotifications = await Notification.find(
            {
                recipients: userId,
            })
            .lean();

        // Filter out notifications that are already marked as read
        const unreadNotificationIds = unreadNotifications
            .filter(async (notification) =>
                !(await ReadNotification
                    .findOne({user: userId, notification: notification._id}))
            )

        // Check if there are any unread notifications
        if (unreadNotificationIds.length === 0) {
            return res.status(httpStatus.BAD_REQUEST).json({error: 'No unread notifications found'});
        }

        // Mark each unread notification as read
        const readNotifications = unreadNotificationIds.map(notification => ({
            user: userId,
            notification: notification._id,
            readAt: Date.now()
        }));

        await ReadNotification.insertMany(readNotifications);

        res.status(httpStatus.OK).json({message: 'All notifications marked as read'});
    } catch (error) {
        console.error('Error marking all notifications as read:', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error: 'Server error'});
    }
}

module.exports = {
    index, store, markAsRead, markAllAsRead
}