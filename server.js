require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path')
const multer = require('multer');
const upload = require('./services/s3-service');
// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, './uploads');
//     },
//     filename: function(req, file, cb){
//         cb(null, Date.now() + file.originalname); 
//     }
// })
// const fileFilter = (req, file, cb) => {
//     if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'img/jpg') {
//         cb(null, true)
//     } else {
//         cb(null, false);
//     }
    
// }

// const upload = multer({ 
//     storage: storage, 
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: fileFilter
// });
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Fortune = require('./backend/models/fortune');
const KwikStar = require('./backend/models/kwik-star');
const Image = require('./backend/models/images');
const ApprovedImage = require('./backend/models/approved-image');
const Supply = require('./backend/models/supply');
const axios = require('axios').default;
const email = require('./services/email-service');
const ical = require('node-ical');
const calParse = require('cal-parser');
const schedule = require('node-schedule');
const moment = require('moment');
const ObjectId = require('mongodb').ObjectID;
const accountSid = process.env.ACCOUNT_SID_TWILLIO;
const authToken = process.env.AUTH_TOKEN_TWILLIO;
const client = require('twilio')(accountSid, authToken);

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connected to Grimes database!')
})
.catch((error) => {
  console.log(error);
  console.log('Connection Failed!')
})

app.use('/uploads', express.static('uploads'))

app.use(express.static(__dirname + '/dist/fortune'));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE, OPTIONS');
    next();
    });

/* Where image is the name of the property sent from angular via the Form Data and the 1 is the max number of files to upload*/
app.post('/upload', upload.array('image', 1), (req, res) => {
    /* This will be th 8e response sent from the backend to the frontend */
    res.send({ image: req.file });
});

app.get('/images', (req, res) => {
    Image.find().then(data => {
        if(data) {
            return res.status(200).json({
                data: data
            })
        }
    })
})

app.post('/user-upload-image', upload.single('image') , (req, res) => {
    const tpImage = new Image({
        tpImage: req.file.path
    })
    tpImage.save().then(result => {
        return res.status(200).json({
            message:'Image Successfully saved',
            data: result
        })
    })
})

app.use ( bodyParser.json( { type: '*/*' }));

app.get('/approved-image', (req, res) => {
    ApprovedImage.find().then(result => {
        return res.status(200).json({
            message:'Image Successfully saved',
            data: result
        })
    })
})

function sendSMS() {
    client.messages
    .create({
        body: 'Someone has agreed to pick up your supplies! Please check your email for more information. (from www.grimesapp.com)',
        from: process.env.PHONE_NUMBER,
        to: process.env.MY_PHONE_NUMBER
    })
    .then(message => console.log(message.sid));
}

app.post(('/approved-image'), (req, res) => {
    ApprovedImage.deleteMany({}, function(err, result){});
    const approvedImage = new ApprovedImage({
        approvedImage: req.body.imgAddress
    })
    
    approvedImage.save().then(result => {
        return res.status(200).json({
            message:'Approved Successfully saved',
            data: result
        })
    })
})

app.get(('/check-on-status'), (req, res) => {
    Fortune.find().then(data => {
        if(data) {
            return res.status(200).json({
                data: data[0].isGardenOpen
            })
        }
    })
});

app.route('/submit-supplies').post((req, res) => {
    const supply = new Supply({
        name: req.body.name,
        email: req.body.email,
        address1: req.body.address1,
        address2: req.body.address2,
        phoneNumber: req.body.phoneNumber,
        zipCode: req.body.zipCode,
        supplyDescription: req.body.supplyDescription,
        suppliesNeeded: req.body.suppliesNeeded
    })
    supply.save();
    sendSMS();
    email.sendSupplyEmail(req.body);
    res.status(201).json({
        message: 'Hello'
    });
})

app.route('/pickup-supplies').post((req, res) => {
    email.sendSupplyList(req.body);
    deleteSupplyList(req.body.id);
    return res.status(200).json({
        message: 'Deleted one item'
    });
})

function deleteSupplyList(id) {
    Supply.findOneAndDelete({ '_id': ObjectId(id) }).then((data) => {
        return;
    })
}

app.get('/get-supplies', (req, res) => {
    Supply.find().then((data) => {
        return res.status(200).json({
            data: data
        })
    })
})

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
    // getDailyDeals();
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

