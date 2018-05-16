
const expect = require('expect');

const { Rooms } = require('./rooms');

describe('rooms.js', ()=>{
  describe('class Rooms', ()=>{
    let roomsManager;
    const testRoom1 = 'testRoom1';

    beforeEach(()=>{
      roomsManager = new Rooms();

      roomsManager.userJoined(testRoom1);
      roomsManager.userJoined(testRoom1);
    });

    it('should return an existing room', ()=>{
      expect(roomsManager.getRoom(testRoom1)).toMatchObject({name: testRoom1, userCount: 2});
    });

    it('should return undefined when retrieving a non-existing room', ()=>{
      expect(roomsManager.getRoom('bogusName')).toBeFalsy();
    });

    it('should automatically create room when user joins a nonexisting one', ()=>{
      const roomName = 'testRoom2';

      roomsManager.userJoined(roomName);

      expect(roomsManager.getRoom(roomName)).toBeTruthy();
    });

    it('should increase user count when a user joins an existing room', ()=>{
      roomsManager.userJoined(testRoom1);

      expect(roomsManager.getRoom(testRoom1).userCount).toBeGreaterThan(2);
    });

    it('should decrease user count when a user leaves an existing room', ()=>{
      roomsManager.userLeft(testRoom1);

      expect(roomsManager.getRoom(testRoom1).userCount).toBeLessThan(2);
    });

    it('should delete the room when all users leave it', ()=>{
      roomsManager.userLeft(testRoom1);
      roomsManager.userLeft(testRoom1);

      expect(roomsManager.getRoom(testRoom1)).toBeFalsy();
    });
  });
});