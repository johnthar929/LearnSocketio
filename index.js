const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    // Handle custom events
    socket.on('message', (msg) => {
        console.log('Message received: ' + msg);
        io.emit('message', msg); // Broadcast message to all clients
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
