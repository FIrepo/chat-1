'use strict';

const express = require('express');

const statusRoutes = require('./status/statusRoutes.js').router;
const userRoutes = require('./user/userRoutes.js').router;
const usersRoutes = require('./users/usersRoutes.js').router;
const conversationRoutes = require('./conversations/conversationRoutes.js').router;
const loginRoutes = require('./login/loginRoutes.js').router;
const followRoutes = require('./follow/followRoutes.js').router;
const followersRoutes = require('./followers/followersRoutes.js').router;
const unfollowRoutes = require('./unfollow/unfollowRoutes.js').router;
const followedRoutes = require('./followed/followedRoutes.js').router;
const isFollowedByMeRoutes = require('./is-followed/isFollowedByMeRoutes.js').router;
const isFollowerRoutes = require('./is-follower/isFollowerRoutes.js').router;
const friendsRoutes = require('./friends/friendsRoutes.js').router;
const isFriendRoutes = require('./is-friend/isFriendRoutes.js').router;
const logoutRoutes = require('./logout/logoutRoutes.js').router;
const blockRoutes = require('./block/blockRoutes.js').router;
const unblockRoutes = require('./unblock/unblockRoutes.js').router;
const blockedRoutes = require('./blocked/blockedRoutes.js').router;

const router = express.Router();

router.use('/status', statusRoutes);
router.use('/user', userRoutes);
router.use('/users', usersRoutes);
router.use('/conversation', conversationRoutes);
router.use('/login', loginRoutes);
router.use('/follow', followRoutes);
router.use('/followers', followersRoutes);
router.use('/unfollow', unfollowRoutes);
router.use('/followed', followedRoutes);
router.use('/is-followed', isFollowedByMeRoutes);
router.use('/is-follower', isFollowerRoutes);
router.use('/friends', friendsRoutes);
router.use('/is-friend', isFriendRoutes);
router.use('/logout', logoutRoutes);
router.use('/block', blockRoutes);
router.use('/unblock', unblockRoutes);
router.use('/blocked', blockedRoutes);

exports.router = router;
