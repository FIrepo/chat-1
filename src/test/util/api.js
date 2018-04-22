'use strict';

const prefix = '/api/v1';
const api = {
  login: () => `${prefix}/login`,
  loginValidate: () => `${prefix}/login/validate`,
  currentUser: () => `${prefix}/user/me`,
  logout: () => `${prefix}/logout`,
  userById: (userId) => `${prefix}/user/${userId}`,
  updateCurrentUser: () => `${prefix}/user`,
  isUsernameAvailable: (username) => `${prefix}/users/is-available/${username}`,
  users: (q, { limit, skip } = {}) => {
    let endpoint = `${prefix}/users?q=${q}`;
    if (limit && skip) {
      endpoint += `&limit=${limit}&skip=${skip}`;
    }
    return endpoint;
  },
  follow: (userId) => `${prefix}/follow/${userId}`,
  unfollow: (userId) => `${prefix}/unfollow/${userId}`,
  isFollowedByMe: (userId) => `${prefix}/is-followed/${userId}`,
  isFollower: (userId) => `${prefix}/is-follower/${userId}`,
  listFollowers: (id, { limit, skip } = {}) => {
    let endpoint = `${prefix}/followers/my`;
    if (limit && skip) {
      endpoint += `?limit=${limit}&skip=${skip}`;
    }
    return endpoint;
  },
  countFollowers: () => `${prefix}/followers/my/count`,
  listFollowedByMe: (id, { limit, skip } = {}) => {
    let endpoint = `${prefix}/followed/by-me`;
    if (limit && skip) {
      endpoint += `?limit=${limit}&skip=${skip}`;
    }
    return endpoint;
  },
  countFollowedByMe: () => `${prefix}/followed/by-me/count`,
  block: (userId) => `${prefix}/block/${userId}`,
  unblock: (userId) => `${prefix}/unblock/${userId}`,
  listBlocked: (id, { limit, skip } = {}) => {
    let endpoint = `${prefix}/blocked`;
    if (limit && skip) {
      endpoint += `?limit=${limit}&skip=${skip}`;
    }
    return endpoint;
  },
  isFriend: (userId) => `${prefix}/is-friend/${userId}`,
  listFriends: (q, { limit, skip } = {}) => {
    let endpoint = `${prefix}/friends/my?q=${q}`;
    if (limit && skip) {
      endpoint += `?limit=${limit}&skip=${skip}`;
    }
    return endpoint;
  },
  countFriends: () => `${prefix}/friends/my/count`,

};

exports.api = api;
