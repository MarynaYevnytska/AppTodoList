var lisTask = document.createElement('ol');
lisTask.className='lisTask';
let list = document.getElementById("MyList");
for (var i=1; i < 8; i++) {
    var row=document.createElement('li');
    var divClose=document.createElement('div');
    var rowTextClose = document.createTextNode('X');
    var rowText = document.createTextNode(i +'дело');
    divClose.className='rowTextClose';
    row.classList='rowCheckIn';
    divClose.append(rowTextClose);
    row.append(divClose);
    lisTask.append(row);
};
list.append(lisTask);
list.addEventListener("click", DOevent, false);
function DOevent(){
    var target = event.target;
    var appTarget=target.className;
    if (appTarget=='rowTextClose'){//alert("Будем удалять");
        lisTask.removeChild(target.parentNode);
    }
    else if (appTarget=='rowCheckIn'){alert("Будем помечать");
    }
    else if (appTarget=='rowCheckOut') {alert("Будем изменять");}
};

// var express = require("express");// connect  the batсh Express
// var app = express();
// var bodyParser = require('body-parser');
// var MongoClient = require("mongodb").MongoClient;
// var url = 'mongodb://localhost:27017/ myProject';
// var urlencodedParser = bodyParser.urlencoded({extended: true});
// var jsonParser = bodyParser.json();
//
// app.set('port', 3000);
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));
// app.listen(3000, function (){console.log('App started')});
// app.use(express.static(__dirname + "/public"));
// //Enter all the tasks
// app.get('/', function(req, response, next){
// //     response.send("hello world");
//     MongoClient.connect(url, {useNewUrlParser: true },function (err,client){
//         var db = client.db("myProject");
//         var collection = db.collection("tasks");
//         collection.find().toArray(function(err, results){
//             response.send({results});
//             client.close();
//         });
//     });
//
// });
//
//
// app.post('/ToDoList', jsonParser, function (request, response){
//     if(!request.body) return response.sendStatus(400);
//     console.log(request.body);
//     response.send(`${request.body.task}`);
//
//     var taskName = request.body.task;
//     MongoClient.connect(url, {useNewUrlParser: true },function (err,client) {
//         var db = client.db("myProject");
//         var collection = db.collection("tasks");
//         console.log("Collection  is created");
//         console.log("Database connection ready");
//         collection.insertOne({taskName}, function(err, result){
//             if (err){
//                 return console.log(err);
//                 return res.status(400).send();
//             }
//             console.log(result.ops);
//             console.log('Connected successfully to data base');
//             collection.find().toArray(function(err, results){console.log(results);
//             });
//             client.close();
//         });
//
//
//     });
// });
//
// app.get('/', function(req, response, next){
//     response.send("hello world");
//     MongoClient.connect(url, {useNewUrlParser: true },function (err,client){
//         var db = client.db("myProject");
//         var collection = db.collection("tasks");
//         collection.find().toArray(function(err, results){
//             response.send(results);
//             client.close();
//         });
//     });
//
// });




