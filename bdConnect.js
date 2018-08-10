var express = require("express");// connect  the batсh Express
var bodyParser = require("body-parser"); //
var mongoClient = require("mongodb").MongoClient;
var objectId = require("mongodb").ObjectID;
var app = express();
var jsonParser = bodyParser.json();
var url = "mongodb://localhost:27017/usersdb";
ф
app.use(express.static(__dirname + "/public")); //discribe the path for storage the static files (html, css)
app.get("/api/users", function(req, res){

    mongoClient.connect(url, function(err, client){
        client.db("usersdb").collection("users").find({}).toArray(function(err, users){
            res.send(users)
            client.close();//
// var express = require('express');
// var app = express();
// var bodyParser = require('body-parser');
// var http=require('http');
// var path= require('path');
// var MongoClient = require('mongodb').MongoClient;
// var db;
// app.set('port', 3000);
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));
//
// http.createServer(app).listen(app.get('port'),function(){
    console.log('Express server listening on port' + app.get('port'))
});
// app.get('/', function (req,res) {res.send('Hello world');});
// var artists=[{id:1, name :'Scorpions'}, {id:2, name :'ABBA'}, {id:3, name:'Roxette'}];
// app.get('/artist', function (req,res) {res.send(artists);});
// app.get('/artist/:id', function (req,res) {
//                                             var artist = artists.find(function (artist){ return artist.id === Number(req.params.id)});
//                                             res.send(artist);});
//
//
// app.post('/artist', function (req, res) {
//
//     var artist={id: Date.now(), name: req.body.name};
//     artists.push(artist);
//     //console.log(req.body);
//     res.send(artists);
// });
//
//
//
// app.put('/artist/:id', function (req,res){
//     var artist = artists.find(function (artist){ return artist.id === Number(req.params.id)});
//     artist.name=req.body.name;
//     res.send(artists);
//     });
//
//
// app.delete ('/artist/:id', function (req, res) {
//     var artist = artists.filter(function (artist) {return artist.id !== Number(req.params.id);});
//     res.sendStatus(200);
// });

//
// /* Connect database*/
//
// var MongoClient = require('mongodb').MongoClient;
// var db;
// mongoClient.connect("mongodb://localhost:27017/", function(err, client){
//
//     if(err){
//         return console.log(err);
//     }
//     // взаимодействие с базой данных
//     client.close();
// });
// const mongoClient = require("mongodb").MongoClient;
// const url = "mongodb://localhost:27017/";
// mongoClient.connect(url, function(err, client){
//
//     const db = client.db("usersdb");
//     const collection = db.collection("users");
//     let user = {name: "Tom", age: 23};
//     db.collection("users").deleteMany({name: "Tom"}, function(err, result){
//
//         if(err){
//             return console.log(err);
//         }
//         console.log(result.ops);
//         console.log ("App started")
//         client.close();
//     });
// });


//
// //app.listen(3000, function(){ console.log ('That all APP')});
// //Midlewear
// //app.use(function (req, res) {
// //res.end("Hello");
//
// //});
// // var createError = require('http-errors');
// //
// // var path = require('path');
// // var cookieParser = require('cookie-parser');
// // var logger = require('morgan');
// //
// // var indexRouter = require('./routes/index');
// // var usersRouter = require('./routes/users');
// //
// //
// //
// // // view engine setup
// // app.set('views', path.join(__dirname, 'views'));
// // app.set('view engine', 'jade');
// //
// // app.use(logger('dev'));
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: false }));
// // app.use(cookieParser());
// // app.use(express.static(path.join(__dirname, 'public')));
// //
// // app.use('/', indexRouter);
// // app.use('/users', usersRouter);
// //
// // // catch 404 and forward to error handler
// // app.use(function(req, res, next) {
// //   next(createError(404));
// // });
// //
// // // error handler
// // app.use(function(err, req, res, next) {
// //   // set locals, only providing error in development
// //   res.locals.message = err.message;
// //   res.locals.error = req.app.get('env') === 'development' ? err : {};
// //
// //   // render the error page
// //   res.status(err.status || 500);
// //   res.render('error');
// // });
// //
// // module.exports = app;

        });
    });
}); // enter the message jy the page whith url "/api/users" datas from base "usersdb"
app.get("/api/users/:id", function(req, res){

    var id = new objectId(req.params.id);
    mongoClient.connect(url, function(err, client){
        client.db("usersdb").collection("users").findOne({_id: id}, function(err, user){

            if(err) return res.status(400).send();

            res.send(user);
            client.close();
        });
    });
});

app.post("/api/users", jsonParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);

    var userName = req.body.name;
    var userAge = req.body.age;
    var user = {name: userName, age: userAge};

    mongoClient.connect(url, function(err, client){
        client.db("usersdb").collection("users").insertOne(user, function(err, result){

            if(err) return res.status(400).send();

            res.send(user);
            client.close();
        });
    });
});

app.delete("/api/users/:id", function(req, res){

    var id = new objectId(req.params.id);
    mongoClient.connect(url, function(err, client){
        client.db("usersdb").collection("users").findOneAndDelete({_id: id}, function(err, result){

            if(err) return res.status(400).send();

            var user = result.value;
            res.send(user);
            client.close();
        });
    });
});

app.put("/api/users", jsonParser, function(req, res){

    if(!req.body) return res.sendStatus(400);
    var id = new objectId(req.body.id);
    var userName = req.body.name;
    var userAge = req.body.age;

    mongoClient.connect(url, function(err, client){
        client.db("usersdb").collection("users").findOneAndUpdate({_id: id}, { $set: {age: userAge, name: userName}},
            {returnOriginal: false },function(err, result){

                if(err) return res.status(400).send();

                var user = result.value;
                res.send(user);
                client.close();
            });
    });
});

app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
});