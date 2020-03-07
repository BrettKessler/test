require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Fortune = require('./backend/models/fortune');
var router = express.Router()

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connected to Grimes database!')
})
.catch((error) => {
  console.log(error);
  console.log('Connection Failed!')
})

app.use(express.static(__dirname + '/dist/fortune'));

app.use ( bodyParser.json( { type: '*/*' }));


app.use(function (req, res, next) {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials" , "true")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();

});

app.get(('/check-on-status'), (req, res) => {
    Fortune.find().then(data => {
        if(data) {
            return res.status(200).json({
                data: data[0].isGardenOpen
            })
        }
    })
});

app.patch('/update-status', (req, res) => {
    const value = req.body.value || 'no';
    Fortune.updateOne({}, { $set: { isGardenOpen: value } }, function(req, res){
    }).catch(error => {
        console.log(error);
    })
    res.send('hello')
});


app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/fortune/index.html'));
});

app.listen(port, () => {
  console.log(`Started Fortune ${port}`);
})

