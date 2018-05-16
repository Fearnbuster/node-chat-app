
class Room {
  constructor(name) {
    this.name = name;
    this.userCount = 1;
  }

  userJoined(){
    ++this.userCount;

    return this.userCount;
  }

  userLeft(){
    --this.userCount;

    if(this.userCount < 0) {
      this.userCount = 0;
    }

    return this.userCount;
  }
}

class Rooms {
  constructor() {
    this.rooms = [];
  }

  addRoom(name) {
    const newRoom = new Room(name);
    
    this.rooms.push(newRoom);

    return newRoom;
  }

  removeRoom(name){
    const indexOf = this.rooms.findIndex((currentRoom)=> currentRoom.name === name);

    if(indexOf > -1){
      const removedRooms = this.rooms.splice(indexOf, 1);

      return removedRooms[0].name;
    }
    else {
      return undefined;
    }
  }

  listAllRooms(){
    const names = this.rooms.map((currentRoom)=> currentRoom.name);

    return names;
  }

  getRoom(name){
    const room = this.rooms.find((currentRoom)=> currentRoom.name === name);

    return room ? room : undefined;
  }

  userJoined(roomName){
    const indexOf = this.rooms.findIndex((currentRoom)=> currentRoom.name === roomName);

    if(indexOf > -1) {
      this.rooms[indexOf].userJoined();
    }
    else {
      this.addRoom(roomName);
    }
  }

  userLeft(roomName){
    const indexOf = this.rooms.findIndex((currentRoom)=> currentRoom.name === roomName);

    if(indexOf > -1) {
      const userCount = this.rooms[indexOf].userLeft();
      
      if(userCount <= 0) {
        this.removeRoom(roomName);
      }
    }
  }
}

module.exports = { Rooms };