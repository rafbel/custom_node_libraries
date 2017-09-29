var nodemailer = require('nodemailer');

function Email()
{
    var transporter;
    
    this.setTransporter = function(_settings)
    {
        transporter = nodemailer.createTransport(_settings);
    };
    
    this.sendEmail = function(_message,onSuccess)
    {
        console.log("Trying to send email. Please wait.");
        transporter.sendMail(_message, function(error, info)
        {
            if (error) 
            {
                console.log(error);
            } 
            else 
            {
                console.log('Email sent: ' + info.response);
                onSuccess();
            }
        });
    };
}

module.exports = Email;