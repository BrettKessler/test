const nodemailer = require('nodemailer');

async function sendContactUs(data) {
    if(data) {
    const output = `
    <h1>${data.name} is reaching out from ${data.email}</h1>
    <h3>They Said:</h3>
    <p>${data.content}</p>
  `
  let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOSTNAME,
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
          user: process.env.NO_REPLY_EMAIL, // generated ethereal user
          pass: process.env.NO_REPLY_PASSWORD // generated ethereal password
      },
      tls:{ rejectUnauthorized: false }
    });

    let info = await transporter.sendMail({
        from: '"Grimes App" <no-reply@sportstakehouse.com>', // sender address
        to: process.env.CONTACT_US_EMAIL, // list of receivers
        subject: 'Contact Us', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    });

    console.log('Contact us Sent: %s', info.messageId);

    }
}
sendContactUs().catch(console.error);

async function updateUser(data) {
    if(data) {
    const output = `
    <h1>Hi, ${data.pickupInfo.name} ${data.pickupList.pickupName} has agreed to get your supplies</h1>
    <h3>Below you can find their contact information in case you need to get ahold of them.</h3>
    <p>Name: ${data.pickupList.pickupName}</p>
    <p>Email: ${data.pickupList.pickupEmail}</p>
    <p>Phone Number: ${data.pickupList.pickupPhoneNumber}</p>
  `
  let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOSTNAME,
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
          user: process.env.NO_REPLY_EMAIL, // generated ethereal user
          pass: process.env.NO_REPLY_PASSWORD // generated ethereal password
      },
      tls:{ rejectUnauthorized: false }
    });

    let info = await transporter.sendMail({
        from: '"Grimes App" <no-reply@sportstakehouse.com>', // sender address
        to: `${data.pickupInfo.email}`, // list of receivers
        subject: 'Someone Is Getting Your Supplies!', // Subject line
        text: '', // plain text body
        html: output // html body
    });

    console.log('Updated user', info.messageId);

    }

}

async function sendSupplyEmail(data) {
    if(data) {
    const output = `
    <h1>Hi ${data.name}, thanks for reaching out!</h1>
    <p>We put your list up on grimes-app.com</p>
    <p>If someone picks up your list, we will notify you via email and also send you their contact info.</p>
  `
  let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOSTNAME,
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
          user: process.env.NO_REPLY_EMAIL, // generated ethereal user
          pass: process.env.NO_REPLY_PASSWORD // generated ethereal password
      },
      tls:{ rejectUnauthorized: false }
    });

    let info = await transporter.sendMail({
        from: '"Grimes App" <no-reply@sportstakehouse.com>', // sender address
        to: `${data.email}`, // list of receivers
        subject: 'Supply List Submitted', // Subject line
        text: '', // plain text body
        html: output // html body
    });
    console.log('Supply Email', info.messageId);

    }
}
sendContactUs().catch(console.error);

async function sendSupplyList(data) {
    if(data) {
    const output = `
    <h1>Hi ${data.pickupList.pickupName}, thanks for being a good resident of Grimes</h1>
    <h3>Below you can find the supplies ${data.pickupInfo.name} needs.</h3>
    <p>Email: ${data.pickupInfo.email}</p>
    <p>Address: ${data.pickupInfo.address1}</p>
    <p>Address 2: ${data.pickupInfo.address2}</p>
    <p>Phone Number: ${data.pickupInfo.phoneNumber}</p>
    <p>Zip Code: ${data.pickupInfo.zipCode}</p>
    <h3>They are needing</h3>
    <p>${data.pickupInfo.suppliesNeeded}</p>
  `
  let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOSTNAME,
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
          user: process.env.NO_REPLY_EMAIL, // generated ethereal user
          pass: process.env.NO_REPLY_PASSWORD // generated ethereal password
      },
      tls:{ rejectUnauthorized: false }
    });

    let info = await transporter.sendMail({
        from: '"Grimes App" <no-reply@sportstakehouse.com>', // sender address
        to: `${data.pickupList.pickupEmail}`, // list of receivers
        subject: 'Grimes Resident Supply List', // Subject line
        text: '', // plain text body
        html: output // html body
    });
    await updateUser(data);
    console.log('Sent supply list', info.messageId);

    }
}
sendContactUs().catch(console.error);

module.exports = {
    sendContactUs,
    sendSupplyList,
    sendSupplyEmail
}