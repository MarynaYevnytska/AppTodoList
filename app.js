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
app.post('/', function(request, response, next){
    console.log(" first action hello world from server");
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
//         var id =  req.get('Content-Type');
//     console.log("test");
//     console.log(req.params);
//     response.send("test");
//     // MongoClient.connect(url, {useNewUrlParser: true },function (err,client){
//     //     var db = client.db("myProject");
//     //     var collection = db.collection("tasks");
//     //     collection.findOne({_id: id}).toArray(function(err, results){
//     //         response.send({results});
//     //         var task=[{results}];
//     //         client.close();
//     //     });
//     // });
// });

// Add datas to stores of data base
app.post('/newTask', jsonParser, function (req, res){
    // console.log(req.is('json'));
    if(!req.body) return response.sendStatus(400);
    var bodyValue = (req.body);
    var taskName=bodyValue.task;
    var taskPriority=bodyValue.priority;
    var taskRate=bodyValue.rate;
    var taskDate=bodyValue.data;
    console.log(taskName + '  priority  ' +taskPriority + '  Rate  ' + taskRate + '  Date  ' + taskDate);
    MongoClient.connect(url, {useNewUrlParser: true },function (err,client) {
        var db = client.db("myProject");
        var collection = db.collection("tasks");
        console.log("Collection  is created, Database connection ready");
        collection.insertOne({taskName, taskPriority, taskRate, taskDate}, function(err, result){
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
    res.send( 'This is new value, than we send to server ☺ ☺');
});


//******************update the tasks to db***********************

app.patch('/:id',jsonParser, function (req, res) {
    var id=(req.params.id);
    var bodyValue = (req.body);
    console.log('ID request' + id + 'body request'+ bodyValue.newTask + bodyValue.priority + bodyValue.rate + bodyValue.data);
    var ObjectId = require('mongodb').ObjectID;
    MongoClient.connect(url, {useNewUrlParser: true },function (err,client) {
        var db = client.db("myProject");
        var collection = db.collection("tasks");
        console.log('Connection was found!  Will edite');
        collection.findOneAndUpdate({"_id": ObjectId(`${id}`)},{$set:{"taskName":bodyValue.newTask, "taskPriority":bodyValue.priority, "taskRate":bodyValue.rate, "taskDate":bodyValue.data}}, function(err, result){
                if (err){
                    return console.log(err);
                    return res.status(400).send();
                }
            console.log(ObjectId + 'Заменили на новое значение');
            client.close();
        });
        res.send('patch request to homepage');
});



    });

 //*************delete the tasks from db**********************

app.delete("/:id", function (req, res, next) {
    var id=(req.params.id);
    var ObjectId = require('mongodb').ObjectID;
    MongoClient.connect(url, {useNewUrlParser: true },function (err,client) {
        var db = client.db("myProject");
        var collection = db.collection("tasks");
        // console.log("Database connection ready");
        collection.deleteOne({"_id": ObjectId(`${id}`)},function(err, result){
            if (err){
                return console.log(err);
                return res.status(400).send();
            }
            console.log(ObjectId);
            client.close();
        });

    });
    console.log('will be delete');
    console.log(MongoClient.ObjectId);
    res.send('DELETE request to homepage');
});



