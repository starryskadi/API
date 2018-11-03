var express = require('express');
app = express();

var request = require('request');
// var bodyParser = require('body-parser');

// app.use(bodyParser);
app.set('view engine', 'ejs');

app.get('/', function(req,res) {
    res.render('search');
});

app.get('/results', function(req,res) {
    var query = req.query.movieTitle; // get data from query
    var url = "http://www.omdbapi.com/?apikey=thewdb&s=" + query;
    request(url, function(error,response,body) {
        if (!error && response.statusCode == 200 && body != '{"Response":"False","Error":"Movie not found!"}') {
            var data = JSON.parse(body);
            res.render('result', {data: data})
        } else {
            res.redirect('/')
        }
    })
   
})

app.get('/results/:id', function(req,res) {
    var id = req.params.id;
    var url = "http://www.omdbapi.com/?apikey=thewdb&i=" + id;
    request(url, function(error,response,body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render('show', {data: data})
        }
    })
})
app.listen(3000, function() {
    console.log('Movie App has Started')
})
