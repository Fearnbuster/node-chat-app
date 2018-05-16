

class Users {
  constructor(){
    this.users = [];
  }

  addUser(id, name, room){
    const user = {id, name, room};

    this.users.push(user);

    return user;
  }

  removeUser(id){
    const indexOf = this.users.findIndex((user)=> user.id === id);

    if(indexOf > -1){
      const removedUsers = this.users.splice(indexOf, 1);

      return removedUsers[0];
    }
    else {
      return undefined;
    }
  }

  getUser(id){
    const user = this.users.find((user)=> user.id === id);

    return user ? user : undefined;
  }

  getUsersInRoom(room){
    let users = this.users.filter((user)=> user.room === room);
    let namesArray = users.map((user)=> user.name);

    return namesArray;
  }

  nameIsTaken(name){
    const user = this.users.find((user)=> user.name === name);

    if(user) {
      return true;
    }
    else {
      return false;
    }
  }
};

module.exports = {Users};