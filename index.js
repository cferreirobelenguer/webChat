const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    //chat html file in this url localhost:3000
    res.sendFile(join(__dirname, 'index.html'));
});

// this will emit the event to all connected sockets
io.emit('some event', {
    someProperty: 'some value',
    otherProperty: 'other value'
}); 
//we’ll send the message to everyone, including the sender
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

//server
server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});