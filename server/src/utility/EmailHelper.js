require('dotenv').config()
const nodemailer = require('nodemailer')
const user = process.env.SMTP_USER
const password = process.env.SMTP_PASSWORD

const EmailSend = async (EmailTo, EmailText, EmailSubject) => {
    let transport = nodemailer.createTransport({
        // host: "smtp.gmail.com",
        // port: 587,
        // secure: false,
        service: "gmail",
        auth: {
            user: user,
            pass: password,
        },
    })


    let mailOption = {
        from: `"MERN Ecommerce Solution" <${user}>`,
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    }

    return await transport.sendMail(mailOption)
}


module.exports = EmailSend


// SMTP_USER = mustafijurmohan@gmail.com
// SMTP_PASSWORD = zzbbsowtzznjmjzc