const { createTransport } = require('nodemailer')
const dotenv = require('dotenv')

dotenv.config();
// import hbs from 'nodemailer-express-handlebars'
// declare vars,
let from = process.env.MAIL_FROM;
let to = process.env.MAIL_TO.split(',')
let subject = 'Frame test suite Report'

const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: from,
        pass: process.env.MAIL_PASSWORD
    }
});

// transporter.use('compile', hbs({
//     viewEngine: 'express-handlebars',
//     viewPath: './views/'
// }))

// email options
let mailOptions = {
    from,
    to,
    subject,
    template: 'index'
};

const sendMail = (logPath, mailContent) => {
    mailOptions['text'] = mailContent
    mailOptions['attachments'] = [
        {
            path: logPath
        }
    ]
    console.log('Sending mail...');
    transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.log(error);
        }
        console.log(response);
    });
}

module.exports = {
    sendMail
}