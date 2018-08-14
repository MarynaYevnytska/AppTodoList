var express = require("express");// connect  the batсh Express
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require("mongodb").MongoClient;
var url = 'mongodb://localhost:27017/ myProject';
var urlencodedParser = bodyParser.urlencoded({extended: true});
var jsonParser = bodyParser.json();
app.set('port', 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.listen(3000, function (){console.log('App started')});
app.use(express.static(__dirname + "/public"));

//Output all the tasks to app's interface
app.post('/', function(req, response, next){
    console.log("hello world from server");
    MongoClient.connect(url, {useNewUrlParser: true },function (err,client){
        var db = client.db("myProject");
        var collection = db.collection("tasks");
        collection.find().toArray(function(err, results){
            response.send({results});
            client.close();
        });
    });
});
// app.get('/:id', function(req, response, next){
//     var id = new objectId(req.params.id);
//     console.log(id);
//     MongoClient.connect(url, {useNewUrlParser: true },function (err,client){
//         var db = client.db("myProject");
//         var collection = db.collection("tasks");
//         collection.findOne({_id: id}).toArray(function(err, results){
//             response.send({results});
//             var task=[{results}];
//             client.close();
//         });
//     });
// });

// Add data to data base
app.post('/ToDoList', jsonParser, function (request, response){
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    //response.send(`${request.body.task}` + 'This is new value, than we send to server ☺ ☺');
    var taskName = request.body.task;
    MongoClient.connect(url, {useNewUrlParser: true },function (err,client) {
        var db = client.db("myProject");
        var collection = db.collection("tasks");
        console.log("Collection  is created");
        console.log("Database connection ready");
        collection.insertOne({taskName}, function(err, result){
            if (err){
                return console.log(err);
                return res.status(400).send();
            }
            console.log(result.ops);
            console.log('Connected successfully to data base');
            collection.find().toArray(function(err, results){console.log(results);
            });
            client.close();
        });

    });
});

//update the tasks to data base

app.put('/', function (req, res) {
    res.send('PUT request to homepage');
});

//delete the tasks to data base

app.delete('/', function (req, res) {
    res.send('DELETE request to homepage');
});



