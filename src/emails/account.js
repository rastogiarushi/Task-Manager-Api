const sgMail = require('@sendgrid/mail')

//const sendgridAPIKey = ''

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'rastogi.arushi@gmail.com',
        subject: 'Thanks for joining in',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'rastogi.arushi@gmail.com',
        subject: 'Your cancellation request has been approved.',
        text: `Sorry to see you go ${name}. Let me know what could I have done to improve your experience.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}




// sgMail.send({
//     to: 'rastogi.arushi@gmail.com',
//     from: 'rastogi.arushi@gmail.com',
//     subject: 'First creation',
//     text: 'I hope this one actually gets to you'
// })