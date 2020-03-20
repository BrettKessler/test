require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path')
const multer = require('multer');
const upload = require('./services/s3-service');
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

app.route('/submit-supplies').post((req, res) => {
    const supply = new Supply({
        name: req.body.name,
        email: req.body.email,
        address1: req.body.address1,
        address2: req.body.address2,
        phoneNumber: req.body.phoneNumber,
        zipCode: req.body.zipCode,
        supplyDescription: req.body.supplyDescription,
        suppliesNeeded: req.body.suppliesNeeded,
        paymentType: req.body.paymentType[0],
        dateSubmitted: moment().format('lll'),
        ipAddess: req.ip
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

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/fortune/index.html'));
});

app.listen(port, () => {
  console.log(`Started Fortune ${port}`);
})

