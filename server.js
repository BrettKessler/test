require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Fortune = require('./backend/models/fortune');
const KwikStar = require('./backend/models/kwik-star');
const https = require('https');
const axios = require('axios').default;
const email = require('./services/email-service');
const puppeteer = require('puppeteer');
const ical = require('node-ical');
const calParse = require('cal-parser');
const schedule = require('node-schedule');
const moment = require('moment');

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

app.post(('/submit-contact'), (req, res) => {
    const contactData = req.body;
    email.sendContactUs(contactData);
})

app.get('/forecast', (req, res) => {
    getForecast(req, res);
})

app.get('/kwik-star', (req, res) => {
    getQuickStar(req, res);
})

app.get('/daily-deals', (req, res) => {
    const today = new Date();
    let deals = [];
    KwikStar.find().then((data) => {
        data.forEach((obj, i) => {
            let startDate = obj.startDate;
            let endDate = obj.endDate;          
            if (moment(today).isSame(startDate, 'day')){
                deals.push(data[i]);
            }
        })
        return res.status(200).json({
            data: deals
        });
    })

})

schedule.scheduleJob('0 0 0 * * 1', function(){
    getDailyDeals();
});

// app.get('/daily-deals', (req, res) => {
//     getDailyDeals(req, res);
// })

function getDailyDeals(req, res) {
    ical.async.fromURL('https://tockify.com/api/feeds/ics/food.specials', function(err, data) {
        const parse = data.body;
        const parsed = calParse.parseString(parse);
        const events = parsed.events;

        events.forEach(data => {
            const kwikStarData = new KwikStar({
                description: data.description.value,
                summary: data.summary.value,
                url: data.url.value,
                startDate: data.dtstart.value,
                endDate: data.dtend.value
            })
            kwikStarData.save();
        })
    });
}



function getForecast(req, res){
    const exclude = `exclude=[minutely,hourly,daily]`;
    axios.get(`https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/41.6755528, -93.789241?${exclude}?units=[auto]`, (req, res) )
    .then(function (response) {
        // handle success
        return res.status(200).json({
            data: response.data
        })
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });
}

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

