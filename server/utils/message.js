
const moment = require('moment');

const generateMessage = (from, text)=>{
  return {from, text, createdAt: moment().valueOf()};
};

const generateLocationMessage = (from, latitude, longitude)=>{
  return {
    from, 
    url: `https://www.google.com/maps?q=${latitude},${longitude}`, 
    createdAt: moment().valueOf()
  };
};

const formatString = (message)=>{
  if(message.length > 0) { 
    return message.replace(/\s+/g, ' ').trim();
  }
  else {
    return '';
  }
};

module.exports = {generateMessage, generateLocationMessage, formatString};