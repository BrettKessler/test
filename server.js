require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');



// const Users = require('./backend/models/users');

app.use(express.static(__dirname + '/dist/fortune'));

// This parses the bodys of requests, it was bullshit before, but now it's less bullshit.
app.use ( bodyParser.json( { type: '*/*' }));

// If we don't take care of the CORS policy, the site will not let our routing be handled
// it's a security thing. What this is saying is, if the request comes from "http://localhost:4200"
// assume that it is a good route and safe for us to use.

// Read more about CORS here: https://www.codecademy.com/articles/what-is-cors

// Add headers
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

app.route('/', (req, res, next) => {
})

// User routing goes here now.
// app.use('/user', userRoute)

// Games routing goes to here now.
// app.use('/api/games', gamesRoute)

// Twitter routing goes here now.
// app.use('/api/twitter', twitterRoute);

// Betting routing
// app.use('api/betting', bettingRoute);


app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/sport-stakehouse-app/index.html'));
});

app.listen(port, () => {
  console.log(`Started Fortune ${port}`);
})

