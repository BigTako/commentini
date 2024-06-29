export const WS_SERVER_EVENTS = {
  GET_ALL_POSTS: 'get-all-posts',
  GET_POST: 'get-post',
  CREATE_POST: 'create-post',
  CREATE_REPLY: 'create-reply',
};

export const WS_CLIENT_EVENTS = {
  USER_CONNECTED: 'user-connected',
  POST_CREATED: 'post-created',
  REPLY_CREATED: 'reply-created',
  RECEIVE_ALL_POSTS: 'receive-all-posts',
  RECEIVE_POST: 'receive-post',
  USER_DISCONNECTED: 'user-disconnected',
  SERVER_EXCEPTION: 'server-exception',
};
