
const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', ()=>{
  it('should generate correct message object', ()=>{
    const from = 'testUser';
    const text = 'This is a test';

    const message = generateMessage(from, text);

    expect(message).toMatchObject({from, text});
    expect(typeof message.createdAt).toBe('number');
  })
});