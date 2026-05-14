import { Server } from 'socket.io';
export const initSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
            credentials: true
        }
    });
    io.on('connection', (socket) => {
        const userId = socket.handshake.auth.userId;
        if (userId) {
            socket.join(`user-${userId}`);
            console.log(`🟢 User ${userId} connecté`);
        }
        socket.on('disconnect', () => {
            console.log(`🔴 User ${userId} déconnecté`);
        });
    });
    return io;
};
//# sourceMappingURL=indexSocket.js.map