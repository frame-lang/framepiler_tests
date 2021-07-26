const { createTransport } = require('nodemailer')
const mg = require('nodemailer-mailgun-transport')
const handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
const { promisify }  = require('util')
const readFile = promisify(fs.readFile)
dotenv.config()

const emailTemplateSource = fs.readFileSync(path.join(__dirname, '/template.hbs'), 'utf8')

const mailgunAuth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  }
}

const smtpTransport = createTransport(mg(mailgunAuth))

const template = handlebars.compile(emailTemplateSource)

const mailOptions = {
  from: process.env.MAIL_FROM,
  to: process.env.MAIL_TO.split(),
  subject: 'Frame Test Suite Results',
}

const sendMail = async (logPath, errorInTestSuite) => {
  try {
    const message = errorInTestSuite
                    ? 'The test suite is consists with errors. Please take a look on the logs.'
                    : 'All files are successfully processed without any errors.'

    const htmlToSend = template({ message })

    mailOptions['html'] = htmlToSend

    let fileName = logPath.split('/');
    fileName = fileName[fileName.length - 1]

    const logFile  = await readFile(logPath, 'utf-8')

    mailOptions['attachments'] = [{
      filename: fileName,
      content: logFile
    }]

    smtpTransport.sendMail(mailOptions, (error, response) => {
      if (error) {
        console.log('Error while sending mail:', error)
      } else {
        console.log('Successfully sent email. \nResponse:', response)
      }
    })
  } catch (err) {
    console.log('Caught exception while sending mail:', err)
  }

}

module.exports = {
    sendMail
}