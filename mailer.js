const nodemailer = require('nodemailer');
const EmailTemplate = require('email-templates').EmailTemplate;
const Promise = require ("bluebird");
const error = require("./error");

let mailer = {};

const templatesDir = __dirname + "/templates";

const fromInfo = {
    email: 'LLantern2017@gmail.com',
    pass: '92gyN86NES6UsjPL'
};

const transporter = nodemailer.createTransport ({
    service: 'gmail',
    auth: {
        user: fromInfo.email,
        pass: fromInfo.pass
    }
});

let mailOptions = {
    from: fromInfo.email,
    text: ''
}


module.exports = mailer = {
    sendActivation,
    sendRecoveryRequest
};

function sendRecoveryRequest (email, token) {
    return new Promise ((res, req) => {
        const template = new EmailTemplate(templatesDir + "/recovery");
        mailOptions.to = email;
        mailOptions.subject = "Recovery Email";
        const url = "http://localhost:8081/api/user/passwordreset?email=" + email + "&token=" + token;
        template.render({email: email, url: url}, (err, results) => {
            if (err) {
                rej(error.new(error.codes.INTERNAL_SERVER_ERROR, "failed to template email"));
            }
            mailOptions.html = results.html;
            mailOptions.text = results.text;
            transporter.sendMail(mailOptions, (err, responseStatus) => {
                if (err) {
                    rej(error.new(error.codes.INTERNAL_SERVER_ERROR, "failed sending recovery email"));
                } else {
                    res(responseStatus);
                }
            });
        });
    });
}

function sendActivation (email, token) {

    return new Promise((res, rej) => {
        const template = new EmailTemplate(templatesDir + "/activation");

        mailOptions.to = email;
        mailOptions.subject = "Activation Email";
        const url = "http://localhost:8081/api/user/activate?email=" + email + "&token=" + token;
        template.render({email: email, url: url}, (err, results) => {
            if (err) {
                rej(error.new(error.codes.INTERNAL_SERVER_ERROR, "failed to template email"));
            }
            mailOptions.html = results.html;
            mailOptions.text = results.text;
            transporter.sendMail(mailOptions, (err, responseStatus) => {
                if (err) {
                    rej(error.new(error.codes.INTERNAL_SERVER_ERROR, "failed sending activity email"));
                } else {
                    res(responseStatus);
                }
            });
        });
    });
}