
let socket = io();

socket.on('updateRoomsList', function(rooms){
  console.log(rooms);
  let options = jQuery('<datalist id="rooms"></datalist>');

  rooms.forEach(function(room){
    options.append(jQuery('<option></option>').text(room));
  });

  jQuery('#roomsList').html(options);
});