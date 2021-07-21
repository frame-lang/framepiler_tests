import { createTransport } from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config();
// import hbs from 'nodemailer-express-handlebars'
// declare vars,
let from = process.env.MAIL_FROM;
let to = process.env.MAIL_TO.split(',');
let subject = 'Frame test suite Report';
let text = `
Hi,

Please find the attached report generated for the test suite available.

Regards
` 

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
    text,
    template: 'index'
};

const sendMail = (logPath) => {
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

export {
    sendMail
};