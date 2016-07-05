var mysql = require('mysql');
var con = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : '',
    database    : 'biciapp'
});
con.connect();

// imports
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// configure

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 

// routing


// GET methods
app.get('/accounts', function(req, res){
     con.query('SELECT * from accounts', function(err, rows){
        if(err) throw err;
        res.json(rows);
        
    });
});

app.get('/accounts/:id', function(req,res){
    con.query('SELECT * from accounts WHERE IDAccount = ? ', req.params.id, function(err, results){
        if(err) throw err;
        res.json(results);
    });
});


// POST methods
app.post('/accounts', function(req,res){
    var post = {
        username: req.body.Username,
        password: req.body.Password
        };

     con.query('INSERT INTO accounts SET ? ', post, function(err, result){
        if(err) throw err;
        res.json(result);
    });
});


// PUT methods
app.put('/accounts/:id', function(req,res){
     var user = {
         Username: req.body.Username,
         Password: req.body.Password
     }
     con.query('UPDATE accounts SET ? WHERE IDAccount = ?', [user, req.params.id], function(err, result){
        if(err) throw err;
        res.json(result);
    });

});

// DELETE methods
app.delete('/accounts/:id', function(req,res){
    con.query('DELETE FROM accounts WHERE IDAccount = ?', req.params.id, function(err, result){
        if(err) throw err;
        res.json(result);
    });
});

// serving
app.listen(8080);
console.log('server started! ');