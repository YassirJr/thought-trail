const passport = require("passport")
const {httpStatus} = require("../constants/index.constants");

const authCallback = (req, res) => {
    res.redirect("http://localhost:3000/account/admin/dashboard")
}

const logout = (req, res) => {
    req.user = {}
    req.logout(function (err) {
        if (err) { return next(err); }
        return res.status(httpStatus.OK).json({ message: "successfully logged out" })
    });
}

module.exports = {
    authCallback,
    logout
}