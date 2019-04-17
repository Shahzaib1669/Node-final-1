const express = require('express');
const bodyParser = require('body-parser');

var utils = require('./utils');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



app.post('/saveStudent', function(request, response) {
    var id = request.body.id;
    var name = request.body.name;
    var email = request.body.email;
    // response.send(id + ' ' + name + ' ' + email);

    var db = utils.getDb();
    db.collection('students').insertOne({
        id: id,
        name: name,
        email: email
        }, (err, result) => {
        if (err) {
            response.send('Unable to insert student');
        }
        response.send(JSON.stringify(result.ops, undefined, 2));
    });
});

app.put('/updateStudent/:name', function(request, response) {
    var db = utils.getDb();
    var id = request.body.id;
    var name = request.body.name;
    var email = request.body.email;
    db.collection('students').findOneAndUpdate({name: request.params.name}, {'$set': {'name': name, 'id': id, 'email': email}}, (err, item) => {
        response.send(`Updated the document ${request.params.name} in the collection`);
        console.log(`Updated: ${request.params.name}`);
    });
});

app.delete('/deleteStudent/:name', function(request, response) {
    var db = utils.getDb();
    var name = request.params.name;
    db.collection('students').findOneAndDelete({name: name}, (err, item) => {
        response.send(`Deleted the document ${name} from the collection`);        
        console.log(`Deleted: ${name}`);
    });
});

app.get('/getStudent/:name', function(request, response) {
    var db = utils.getDb();
    var name = request.params.name;
    db.collection('students').find({name: name}).toArray((err, items) => {
        response.send(items);
    });
});



app.get('/all', function(request, response) {
    var db = utils.getDb();
    db.collection('students').find().toArray((err, items) => {
        response.send(items);
    });
    
});



app.listen(8080, () => {
    console.log('Server is up on the port 8080')
    utils.init();
})