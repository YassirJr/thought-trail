var express = require('express');

const oauthRouter = express.Router();
const v1 = express.Router();

var authRouter = require('./auth.route');
var googleAuthRouter = require('./google-auth.route');
var githubAuthRouter = require('./github-auth.route');
var usersRouter = require('./users.route');
var storyRouter = require('./story.route');
var profileRouter = require('./profile.route')
var tagRouter = require('./tag.route')
var notificationRouter = require('./notification.route')
var followUpRouter = require('./follow-up.route')


// call routes
// Merge googleAuthRouter and githubAuthRouter into oauthRouter
oauthRouter.use('/google', googleAuthRouter);
oauthRouter.use('/github', githubAuthRouter);

// Use oauthRouter with the v1 router
v1.use('/oauth', oauthRouter);
v1.use('/auth', authRouter);
v1.use('/users', usersRouter);
v1.use('/profile', profileRouter);
v1.use('/stories', storyRouter);
v1.use('/tags', tagRouter);
v1.use('/notifications', notificationRouter);
v1.use('/follow-ups', followUpRouter);

module.exports = {v1}