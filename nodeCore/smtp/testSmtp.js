const nodemailer = require('nodemailer');

function sendSMTPMessage(){
  nodemailer.createTestAccount((err, account) => {
    console.log(account)
    if (err) {
      console.error('Failed to create a testing account. ' + err.message);
      return process.exit(1);
    }
  
    console.log('Credentials obtained, sending message...');
  
    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass
      }
    });
  
    // Message object
    let message = {
      from: 'Sender Name <sender@example.com>',
      to: 'Recipient <recipient@example.com>',
      subject: 'Nodemailer is unicode friendly ✔',
      text: 'Hello to myself!',
      html: '<p><b>Hello</b> to myself!</p>'
    };
  
    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log('Error occurred. ' + err.message);
        return process.exit(1);
      }
  
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  });
}

function sendMessageToMailCatcher(){
  const transporter = nodemailer.createTransport({
    host: 'localhost', // you need to start mail catcher locally
    port: 1025,
    secure: false,
  });

  let mail = {
    from: 'testFrom@email.com',
    to: 'testTo@email.com',
    subject: 'test',
    text: 'hello world!!!!'
  };

  transporter.sendMail(mail, function (err, mailResult) {
    if(err){console.log(err)}
    console.log(mailResult)
  });
}

