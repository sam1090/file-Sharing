const nodemailer = require('nodemailer');

async function sendMail({ from, to, subject, text, html }) {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,

    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: `InShare <${from}>`,
    to,
    subject,
    text,
    html,
  });
  res.status(200).send({ sucess: true });
}

module.exports = sendMail;
