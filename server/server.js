
// Started: May 11, 2018

const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

const { generateMessage, generateLocationMessage } = require('./utils/message');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

// Static folder:
app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('New user connected');

  socket.on('disconnect', (socket)=>{
    console.log('A user disconnected');
  });

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message, callback)=>{
    console.log('Create message', message);

    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server.');
  });

  socket.on('createLocationMessage', (coords)=>{
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });
});



server.listen(port, (err)=>{
  if(err) {
    return console.log(err);
  }

  console.log(`Server listening on port ${port}`);
});
