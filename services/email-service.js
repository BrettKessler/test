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

module.exports = {
    sendContactUs
}