
const expect = require('expect');

const { generateMessage, generateLocationMessage, formatString } = require('./message');

describe('messages.js', ()=>{
  describe('generateMessage', ()=>{
    it('should generate correct message object', ()=>{
      const from = 'testUser';
      const text = 'This is a test';
  
      const message = generateMessage(from, text);
  
      expect(message).toMatchObject({from, text});
      expect(typeof message.createdAt).toBe('number');
    })
  
    it('should generate correct location object', ()=>{
      const from = 'testUser';
      const latitude = 1;
      const longitude = 1;
      const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
  
      const message = generateLocationMessage(from, latitude, longitude);
  
      expect(message).toMatchObject({ from, url });
      expect(typeof message.createdAt).toBe('number');
    });
  });

  describe('formatString', ()=>{
    it('should remove leading and trailing spaces', ()=>{
      expect(formatString('  test   ')).toBe('test');
    });

    it('should remove excessive inner white spaces', ()=>{
      expect(formatString('has  too   many    spaces')).toBe('has too many spaces');
    });
  });
});
