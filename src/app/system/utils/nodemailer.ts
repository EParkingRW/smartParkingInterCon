import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendEmail = (mailOptions: {
  email: string;
  subject: string;
  message: string;
}) => {
  var transporter = nodemailer.createTransport({
    host: process.env.TRANSPORTER_SERVICE, // hostname
    service: 'outlook',
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
      rejectUnauthorized: false
    },
    auth: {
      user: process.env.SERVICE_USERNAME,
      pass: process.env.SERVICE_PASSWORD,
    }
});
  const Options = {
    from: `Smart Parking App <${process.env.SERVICE_USERNAME}>`,
    to: mailOptions.email,
    subject: mailOptions.subject,
    html: mailOptions.message,
  };
  return transporter.sendMail(Options, (error, info) => {
    if (error) {
      console.log(error.message);
      return false;
    }else{
      console.log(info.info.response)
      return true;
    }

  });
};

export default sendEmail;
