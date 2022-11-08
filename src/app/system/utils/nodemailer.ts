import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendEmail = (mailOptions: {
  email: string;
  subject: string;
  message: string;
}) => {
  const transporter = nodemailer.createTransport({
    host: process.env.TRANSPORTER_SERVICE,
    port: 465,
    auth: {
      user: process.env.SERVICE_USERNAME,
      pass: process.env.SERVICE_PASSWORD,
    },
    secure: true,
    logger: true,
    debug: true,
  });
  const Options = {
    from: `Smart Parking App <${process.env.SERVICE_USERNAME}>`,
    to: mailOptions.email,
    subject: mailOptions.subject,
    html: mailOptions.message,
  };
  return transporter.sendMail(Options, error => {
    if (error) {
      console.log(error.message);
    }
  });
};

export default sendEmail;
