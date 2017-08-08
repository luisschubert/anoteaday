var express = require('express');
var app = express();
app.get('/', function(req, res) {
    fs.readFile("main.html",function(err, data){
        if(err){
            res.statusCode = 500;
        }
        else{
            res.setHeader('Content-type','text/html');
            res.end(data);
        }
    })
});

app.listen(3000, function() {
    console.log('started server on 3000')
});
