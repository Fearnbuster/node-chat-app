
const moment = require('moment');


let momentTimestamp = moment().valueOf();
let nativeTimestamp = new Date().getTime();

console.log(momentTimestamp);
console.log(nativeTimestamp);

let date = moment();

console.log(date.format('h:mm a'));