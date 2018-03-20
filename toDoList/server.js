console.log('May Node be with you');

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(bodyParser.json())
app.set('view engine', 'ejs')

var url = "mongodb://WesleyWei:StarWars@ds117719.mlab.com:17719/star-war-quotes";

var db;

MongoClient.connect(url, (err, client) => {
    if (err) return console.log(err);
    db = client.db('star-war-quotes');
    app.listen(3000, function() {
        console.log('listening on 3000');
    })
})

app.get('/', (request, response) => {
    // response.sendFile(__dirname + "/index.html")
    var cursor = db.collection('quotes').find();
    cursor.toArray((err, results) => {
        if (err) return console.log(err)

        response.render('index.ejs', {quotes: results})
    })
})

app.post("/quotes", (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('saved to database');
        res.redirect('/');
    })
})

app.put('/quotes', (req, res) => {
    db.collection('quotes')
    .findOneAndUpdate(
    {
        name: 'Yoda'
    }, 
    {
        $set: {
            name: req.body.name,
            quote: req.body.quote
        }
    }, 
    {
        sort: {_id: -1},
        upsert: true
    }, (err, result) => {
            if (err) return res.send(err)
            res.send(result)
    })
})

app.delete('/quotes', (req, res) => {
    db.collection('quotes').findOneAndDelete({name: req.body.name},
    (err, result) => {
        if (err) return res.send(500, err)
        res.send({message: 'A darth vadar quote got deleted'})
    })
})