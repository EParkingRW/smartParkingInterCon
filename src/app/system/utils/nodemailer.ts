import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
// import Response from './../helpers/Response';
// import { ServerResponse } from 'http';

dotenv.config();

const port = Number(process.env.TRANSPORTER_PORT) || 465;

const sendEmail = (mailOptions: {
  email: string;
  subject: string;
  message: string;
}) => {
  const transporter = nodemailer.createTransport({
    host: process.env.TRANSPORTER_SERVICE,
    port: port,
    auth: {
      user: process.env.SERVICE_USERNAME,
      pass: process.env.SERVICE_PASSWORD,
    },
    secure: port === 465,
    logger: true,
    debug: true,
  });
  const Options = {
    from: `Smart Parking App <${process.env.SERVICE_USERNAME}>`,
    to: mailOptions.email,
    subject: mailOptions.subject,
    html: mailOptions.message,
  };
  return new Promise((resolve,reject)=>{
    transporter.sendMail(Options, (error, info)=>{
      if(info){
        return resolve(true);
      }
      return reject(error.message)
    })
  })
};

export default sendEmail;
