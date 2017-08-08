var jsonfile = require('jsonfile');
var time = require('time');
// var fs = require('fs');
var newThought = "This is a novel thought"

var now = new time.Date();
now.setTimezone("America/Los_Angeles");
var dayAsKey = now.getFullYear() +'.'+ (now.getMonth()+1) +'.'+ now.getDate();
//
// fs.readFile("notes.json",function(err, data) {
//     if(err) {
//         console.error('bruh, why?');
//     }
//     else {
        // var notes = data;
        // var keys = Object.keys(notes);
        // if (!keys.includes(dayAsKey)) {
        //     notes[dayAsKey] = [];
        // }
        // else{
        //     notes[dayAsKey].push(newThought);
        // }
//     }
// })

// var obj = fs.readFileSync('notes.json', 'utf8');



function readWriteCycle(newThought) {
    var notes = jsonfile.readFileSync('notes.json', {flag: 'w+'});
    var keys = Object.keys(notes);
    if (!keys.includes(dayAsKey)) {
        notes[dayAsKey] = [newThought];
    }
    else{
        notes[dayAsKey].push(newThought);
    }
    jsonfile.writeFileSync('notes.json', notes)
}

readWriteCycle("test")
