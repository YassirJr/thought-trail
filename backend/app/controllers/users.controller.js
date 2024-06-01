const User = require("../models/user.model");
const {isLoggedIn} = require("../middlewares/is-logged-in.middleware");

const findAll = async (req, res) => {
    const users = await User.find();
    if (users.length > 0) {
        res.status(200)
            .json(
                {
                    data: users ,
                    success : true
                }
            )
    } else res.status(204)
}

const findOne = async (req, res) => {
    const {id} = req.params
    const user = await User.findById(id);
    if (user) {
        res.status(200)
            .json(
                {
                    data: user
                }
            )
    } else res.status(204)
}

const me = async (req, res) => {
    const _id = req.user._id
    const user = await User.findById(_id)
    res.status(200).json({user})
}
module.exports = {findAll, findOne, me}

