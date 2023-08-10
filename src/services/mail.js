// eslint-disable-next-line import/no-extraneous-dependencies
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const {
  NodeEnv,
  toNumber,
  getOsEnv,
  normalizePort,
} = require('../shared/utils');

dotenv.config({ path: `.env.${getOsEnv('NODE_ENV')}` });
const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  auth: {
    user: process.env.AUTH_MAIL,
    pass: process.env.AUTH_PASS,
  },
});

transporter.verify((error) => {
  if (error) console.error(error);
  else console.log('Success');
});

module.exports = {
  sendMail: async (recipient, subject, body, attachments = []) => {
    try {
      const options = {
        from: `"${process.env.AUTH_MAIL}`, // sender address
        to: recipient, // list of receivers
        priority: 'high',
        subject,
        html: body,
        attachments,
      };

      console.log('temp');

      transporter.sendMail(options, (error, info) => {
        if (error) console.error(error);

        console.log(info.messageId);
      });
    } catch (error) {
      console.log(error);
    }
  },
};
