const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SG_API_KEY)

const sendConfirmationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'hajjaj.mohammad99@gmail.com',
        subject: 'Your order has been confirmed!',
        text: `Your order has been confirmed, ${name}.`
    })
}

module.exports = {
    sendConfirmationEmail,

}