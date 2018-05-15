
const expect = require('expect');

const { isRealString } = require('./validation');

describe('isRealString', ()=>{
  it('should reject non-string values', ()=>{
    expect(isRealString(123)).toBeFalsy();
  });

  it('should reject strings with only spaces', ()=>{
    expect(isRealString('  ')).toBeFalsy();
  });

  it('should accept string that contains non-space characters', ()=>{
    expect(isRealString('should succeed')).toBeTruthy();
  });
});