
// Started: May 11, 2018

const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const _ = require('lodash');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

const { generateMessage, generateLocationMessage, formatString } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');
const { Rooms } = require('./utils/rooms');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let usersManger = new Users();
let roomsManager = new Rooms();

// Static folder:
app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  socket.on('join', (params, callback)=>{
    const body = _.pick(params, ['name', 'room']);

    if(!body.name, !body.room) {
      return callback('Name and room name are required.');
    }
  
    const name = formatString(body.name);
    const room = formatString(body.room).toLowerCase();

    if(!isRealString(name) || !isRealString(room)) {
      return callback('Name and room name are required.');
    }

    if(usersManger.nameIsTaken(name)) {
      return callback(`The username '${name}' is already in use`);
    }

    socket.join(room);

    let oldUser = usersManger.removeUser(socket.id);

    if(oldUser) {
      roomsManager.userLeft(oldUser.room);
    }

    usersManger.addUser(socket.id, name, room);
    roomsManager.userJoined(room);

    io.to(room).emit('updateUserList', usersManger.getUsersInRoom(room));

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.to(room).emit('newMessage', generateMessage('Admin', `${name} has joined`));

    io.emit('updateRoomsList', roomsManager.listAllRooms());

    callback();
  });

  socket.on('disconnect', ()=>{
    let user = usersManger.removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('updateUserList', usersManger.getUsersInRoom(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));

      roomsManager.userLeft(user.room);

      io.emit('updateRoomsList', roomsManager.listAllRooms());
    }
  });

  socket.on('createMessage', (message, callback)=>{
    let user = usersManger.getUser(socket.id);

    if(user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }

    callback();
  });

  socket.on('createLocationMessage', (coords)=>{
    let user = usersManger.getUser(socket.id);

    if(user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });
});



server.listen(port, (err)=>{
  if(err) {
    return console.log(err);
  }

  console.log(`Server listening on port ${port}`);
});
