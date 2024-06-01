const User = require('../models/user.model')
const {store: storeNewNotification} = require('../controllers/notification.controller')
const {httpStatus} = require("../constants/index.constants");


const getFollowers = async (req, res) => {
    const userId = req.user?._id

    const {followers} = await User.findById(userId).select('followers')

    return res.status(httpStatus.OK)
        .json(
            {
                success: true,
                data: followers
            }
        )
}

const getFollowings = async (req, res) => {
    const userId = req.user?._id
    const {followings} = await User.findById(userId).select('followings')

    return res.status(httpStatus.OK)
        .json(
            {
                success: true,
                data: followings
            }
        )
}

const follow = async (req, res) => {
    const userId = req.user?._id

    try {
        const {targetUserId} = req.body;

        // Update the user's following list
        const follower = await User.findByIdAndUpdate(userId, {
            $addToSet: {followings: targetUserId}
        });

        // Update the target user's followers list
        const followed = await User.findByIdAndUpdate(targetUserId, {
            $addToSet: {followers: userId}
        });

        const followings = await User.findById(userId).select('followings')

        await storeNewNotification(
            {
                senderId: userId,
                title: `${follower.fname} ${follower.lname} start for following you.`,
                recipients: [targetUserId],
                notificationType: 'follow'
            }
        )


        res.status(httpStatus.OK).json({success: true, data: followings});
    } catch (error) {
        console.error('Error following user:', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error: 'Server error'});
    }
}

const unfollow = async (req, res) => {
    const userId = req.user?._id

    try {
        const {targetUserId} = req.body;

        // Update the user's following list
        await User.findByIdAndUpdate(userId, {
            $pull: {following: targetUserId}
        });

        // Update the target user's followers list
        await User.findByIdAndUpdate(targetUserId, {
            $pull: {followers: userId}
        });

        res.status(httpStatus.OK).json({message: 'User unfollowed successfully'});
    } catch (error) {
        console.error('Error unfollowing user:', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error: 'Server error'});
    }
}

module.exports =
    {
        getFollowers,
        getFollowings,
        follow,
        unfollow
    }