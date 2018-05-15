
const expect = require('expect');

const { Users } = require('./users');

describe('Users', ()=>{
  let usersManager;

  beforeEach(()=>{
    usersManager = new Users();

    usersManager.addUser(1, 'Mike', 'Node Course');
    usersManager.addUser(2, 'Jen', 'React Course');
    usersManager.addUser(3, 'Julie', 'Node Course');
  });

  it('should remove a user when given a valid id', ()=>{
    const mikesID = 1;
    const removedUser = usersManager.removeUser(mikesID);

    expect(removedUser).toBeTruthy;
    expect(removedUser.name).toBe('Mike');

    expect(usersManager.users.length).toBe(2);
  });

  it('should not remove a user when given an invalid id', ()=>{
    const unusedID = 4;
    const removedUser = usersManager.removeUser(unusedID);

    expect(removedUser).toBeFalsy();
    expect(usersManager.users.length).toBe(3);
  });

  it('should find a user when given a valid id', ()=>{
    const jensID = 2;
    const foundUser = usersManager.getUser(jensID);

    expect(foundUser).toBeTruthy();
  });

  it('should not find a user when given an invalid id', ()=>{
    const unusedID = 4;
    const foundUser = usersManager.getUser(unusedID);

    expect(foundUser).toBeFalsy();
  });

  it('should add new user', ()=>{
    let usersManager = new Users();
    let user = {
      id: 123,
      name: 'Andrew',
      room: 'The Office Fans'
    };

    let response = usersManager.addUser(user.id, user.name, user.room);

    expect(usersManager.users).toEqual([user]);
  });

  it(`should return names for the 'Node Course' room`, ()=>{
    let userList = usersManager.getUsersInRoom('Node Course');

    expect(userList).toEqual(['Mike', 'Julie']);
  });
});