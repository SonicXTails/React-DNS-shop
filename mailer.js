require('dotenv').config()
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

const mailOptions = {
    from: 'isip_m.yu.chistotin@mpt.ru',
    to: 'isip_m.yu.chistotin@mpt.ru',
    subject: 'Лол',
    text: 'ТУкст письма'
}

transporter.sendMail(mailOptions, err = new Error(message))