
// Started: May 11, 2018

const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let usersManger = new Users();

// Static folder:
app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('New user connected');

  socket.on('join', (params, callback)=>{
    if(!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }

    socket.join(params.room);
    usersManger.removeUser(socket.id);
    usersManger.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', usersManger.getUsersInRoom(params.room));

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

    callback();
  });

  socket.on('disconnect', ()=>{
    let user = usersManger.removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('updateUserList', usersManger.getUsersInRoom(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });

  socket.on('createMessage', (message, callback)=>{
    console.log('Create message', message);

    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
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
