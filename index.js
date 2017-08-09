var express = require('express');
var fs = require('fs');
var jsonfile = require('jsonfile');
var time = require('time');
var app = express();
app.get('/', function(req, res) {
    fs.readFile("main.html",function(err, data) {
        if(err) {
            res.statusCode = 500;
        }
        else {
            res.setHeader('Content-type', 'text/html');
            res.end(data);
        }
    })
});
app.get('/new/:thought', async function(req, res) {
    var thought = req.params.thought;
    await readWriteCycle(thought);
    res.end(JSON.stringify({message: thought + ' added'}));
});
app.get('/today', function(req, res) {
    var dayAsKey = getDayAsKey();
    var notes = jsonfile.readFileSync('mynotes.json');
    if (Object.keys(notes).includes(dayAsKey)) {
        res.end(JSON.stringify({today: notes[dayAsKey]}));
    }
    else {
        res.end(JSON.stringify({today: []}));
    }
});

function getDayAsKey(){
    var now = new time.Date();
    now.setTimezone("America/Los_Angeles");
    return now.getFullYear() +'.'+ (now.getMonth()+1) +'.'+ now.getDate();
}

function readWriteCycle(newThought) {
    var dayAsKey = getDayAsKey();
    var notes = jsonfile.readFileSync('mynotes.json');
    var keys = Object.keys(notes);
    if (!keys.includes(dayAsKey)) {
        notes[dayAsKey] = [newThought];
    }
    else{
        notes[dayAsKey].push(newThought);
    }
    jsonfile.writeFileSync('mynotes.json', notes)
}
// app.get('/static/:name', function(req, res) {
//     var file = req.params.name;
//     var filename = file.split('.')[0];
//     var fileextension = file.split('.')[1];
//
//     fs.readFile(file, function(err, data){
//         if(err) {
//             res.statusCode = 500;
//         }
//         else {
//             res.setHeader('Content-type', 'text/'+fileextension);
//         }
//     })
//
// })

app.listen(3000, function() {
    console.log('started server on 3000')
});
