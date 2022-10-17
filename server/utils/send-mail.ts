/*=============================================== Sendmail function ===============================================*/

import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    // @ts-expect-error
    service: "hotmail",

    auth: {
        user: process.env.EMAIL,
        pass: process.env.WORD,
    },

    port: process.env.PORT_SMTP,
})

const sendMail = (to: string, subject: string, html: string) => {
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

export default sendMail
