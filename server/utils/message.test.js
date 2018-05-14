
const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

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