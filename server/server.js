
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

  socket.on('createMessage', function(newMessage){
    console.log('Create message', newMessage);
  });

  socket.emit('newMessage', {
    from: 'Seth',
    text: 'Hello',
    createdAt: 123
  });
});



server.listen(port, (err)=>{
  if(err) {
    return console.log(err);
  }

  console.log(`Server listening on port ${port}`);
});
