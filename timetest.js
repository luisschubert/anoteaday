var time = require('time');
var now = new time.Date();
now.setTimezone("America/Los_Angeles");
var dayAsKey = now.getFullYear() +'.'+ (now.getMonth()+1) +'.'+ now.getDate();
console.log(dayAsKey);
