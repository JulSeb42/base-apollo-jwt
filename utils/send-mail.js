/*=============================================== Sendmail function ===============================================*/

const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.WORD,
    },
    port: process.env.PORT_SMTP,
})

const sendMail = (to, subject, html) => {
    let mailDetails = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        html: html,
    }

    transporter.sendMail(mailDetails, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Email sent successfully.")
        }
    })
}

module.exports = sendMail
