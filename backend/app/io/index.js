const {Server} = require('socket.io');

const userSocketMap = new Map();

const socketServer = (server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL, // Adjust to your client's origin
            methods: ["*"]
        }
    });
    io.on('connection', (socket) => {

        socket.on('user-connected', (userId) => {
            userSocketMap.set(userId, socket.id);
        });

        socket.on('disconnect', () => {
            const userId = getUserIdBySocketId(socket.id);
            if (userId) {
                userSocketMap.delete(userId);
                console.log(`User ${userId} disconnected`);
            }
        });

        socket.on('new-story', (data) => {
            io.emit('receive-notification', data);
        });


        socket.on('new-follow', ({followerId, followeeId}) => {
            const followeeSocket = getSocketIdByUserId(followeeId);
            if (followeeSocket) {
                // Emit the notification to the followee's socket
                io.to(followeeSocket).emit('receive-notification', {
                    type: 'follow',
                    message: `User with ID ${followerId} followed you.`,
                });
            }
        });

        socket.on('new-like', ({likerFullName, postAuthorId}) => {
            const followeeSocket = getSocketIdByUserId(postAuthorId);
            if (followeeSocket) {
                // Emit the notification to the followee's socket
                io.to(followeeSocket).emit('receive-notification', {
                    type: 'like',
                    message: `${likerFullName} liked your story.`,
                });
            }
        });
    });
}


function getSocketIdByUserId(userId) {
    return userSocketMap.get(userId);
}

function getUserIdBySocketId(socketId) {
    for (const [userId, socketUserId] of userSocketMap.entries()) {
        if (socketUserId === socketId) {
            return userId;
        }
    }
    return null;
}


module.exports = {socketServer}


