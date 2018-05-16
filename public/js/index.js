
let socket = io();

socket.on('updateRoomsList', function(rooms){
  console.log(rooms);
});