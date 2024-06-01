const User = require('../models/user.model')

const updateProfile = async (req, res) => {
    const {body} = req
    const _id = req.user._id
    const isRequestHasFile = !!req.file
    try {
        const user = await User.findById(_id);
        if (user) {
            const isEmailExists = await User.findOne({email: body.email})
            if (isEmailExists) {
                return res.status(500).json(
                    {
                        success: false,
                        errors: ["This email already exists"]
                    }
                )
            }
            await User.findByIdAndUpdate(_id,
                {
                    $set: (isRequestHasFile ? {
                            ...body,
                            photo: process.env.STORAGE_URL + req.file.filename
                        }
                        : body)
                }
                , {new: true})
            return res.status(200)
                .json(
                    {
                        message: 'Profile updated successfully .',
                    }
                )
        }
    } catch (err) {
        res.status(500).json(
            {
                success: false,
                errors: [err.message]
            }
        )
    }
}

module.exports = {
    updateProfile
}