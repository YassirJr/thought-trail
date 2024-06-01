const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require('../models/user.model')
const {httpStatus} = require("../constants/index.constants");

const signin = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({
                email,
                googleId: {$exists: false},
                githubId: {$exists: false}
            }
        );
        if (!user) {
            return res.status(httpStatus.NOT_FOUND)
                .json(
                    {
                        errors: [
                            {
                                path: 'email',
                                message: 'email incorrect'
                            }
                        ]
                    }
                );
        }

        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            return res.status(httpStatus.NOT_FOUND)
                .json(
                    {
                        errors: [
                            {
                                path: 'password',
                                message: 'password incorrect'
                            }
                        ]
                    }
                );

        }
        req.user = user
        const token = jwt.sign({user}, process.env.SECRET_KEY, {expiresIn: '1h'});
        return res.status(httpStatus.OK)
            .json(
                {
                    token,
                    user
                }
            );
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR)
            .json(
                {
                    message: 'Internal server error '
                }
            );
    }
}

const signup = async (req, res, next) => {
    const {body} = req
    try {
        const existingUser = await User.findOne({email: body.email});
        if (existingUser) {
            return res.status(httpStatus.BAD_REQUEST).json(
                {
                    errors: [
                        {
                            path: 'email',
                            message: 'Email already exists'
                        }
                    ]
                }
            );
        }
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const newUser = new User({
            ...body,
            password: hashedPassword
        });

        await newUser.save();
        const token = jwt.sign({user: newUser}, process.env.SECRET_KEY, {expiresIn: '1h'});
        req.user = newUser
        return res.status(httpStatus.CREATED)
            .json(
                {
                    message: 'User registered successfully',
                    token,
                    user: newUser
                }
            );

    } catch (err) {
        console.error(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR)
            .json(
                {
                    message: 'Internal server error'
                }
            );
    }
}


module.exports = {signup, signin}