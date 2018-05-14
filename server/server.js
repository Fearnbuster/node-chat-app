
// Started: May 11, 2018

const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

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

  socket.on('createMessage', function(message){
    console.log('Create message', message);

    socket.emit('newMessage', {
      from: 'Admin',
      text: 'Welcome to the chat app',
      createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
      from: 'Admin',
      text: 'New user joined',
      createdAt: new Date().getTime()
    });

    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });

    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });
});



server.listen(port, (err)=>{
  if(err) {
    return console.log(err);
  }

  console.log(`Server listening on port ${port}`);
});
