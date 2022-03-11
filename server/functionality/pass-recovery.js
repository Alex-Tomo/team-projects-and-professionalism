/**
 * Uses nodemailer to send emails via smtp, this will be changed from yahoo
 * to either our own smtp server or a provider, such as mailchimp.
 * 
 * @author Jordan Short
 * 
 */
var nodemailer = require('nodemailer');
var emailTemplate = require('./email-template')

exports.sendEmail = function(toEmail, token, username) {
    var transporter = nodemailer.createTransport({
        service: "Yahoo",
        secure: true,
        auth: {
          user: "kipmcgrathreset@yahoo.com",
          pass: "wtzgaccbedadkave"
        }
      });

var mailOptions = {
  from: 'kipmcgrathreset@yahoo.com',
  to: toEmail,
  subject: 'Password Reset',
  html: emailTemplate.htmlTemplate(token, username)
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  }
});
}