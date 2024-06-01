const {Schema, model} = require('mongoose')


const UserSchema = Schema({
    fname: {
        type: String, required: [true, "first name is required"], min: 3, max: 15, trim: true,
    },
    lname: {
        type: String, required: [true, "last name is required"], min: 3, max: 15, trim: true,
    },
    age: {
        type: Number,
    },
    email: {
        type: String, required: true, unique: true, lowercase: true, validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            }, message: props => `${props.value} is not a valid email address!`
        },
    },
    password: {
        type: String, min: [8, 'Password must be at least 8, got {VALUE}'], trim: true
    },
    photo: {
        type: String
    },
    bio: {
        type: String
    },
    joinedDate: {
        type: Date,
        default: Date.now
    },
    googleId: {
        type: String,
        unique: true
    },
    githubId: {
        type: String,
        unique: true
    },
    roles: Array,
    followers: [{type: Schema.Types.ObjectId, ref: 'User'}],
    followings: [{type: Schema.Types.ObjectId, ref: 'User'}],

})

const User = model('User', UserSchema)

module.exports = User
