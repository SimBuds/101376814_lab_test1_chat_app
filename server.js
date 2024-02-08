const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    socket.on('joinRoom', ({ username, room }) => {
        socket.join(room);
        socket.username = username; // Store username in socket session for future reference
        io.to(room).emit('chatMessage', { user: 'System', text: `${username} has joined ${room}` });
    });

    socket.on('leaveRoom', ({ username, room }) => {
        socket.leave(room);
        io.to(room).emit('chatMessage', { user: 'System', text: `${username} has left ${room}` });
    });

    socket.on('chatMessage', ({ text, room }) => {
        io.to(room).emit('chatMessage', { user: socket.username, text });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));