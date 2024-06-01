import {socket} from "@/services/socket/index.js";


export const notificationSocket = {
  userConnected: (payload) =>
    socket.emit('user-connected', payload),

  newStory: (payload) =>
    socket.emit('new-story', payload),

  newFollow: (payload) =>
    socket.emit('new-follow', payload),

  newLike: (payload) =>
    socket.emit('new-like', payload),

  receiveNotification: (handler) =>
    socket.on('receive-notification', handler),

  off: () =>
    socket.off('receive-notification')
}

