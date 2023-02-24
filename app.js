const express = require('express');
require('dotenv').config();


const cors = require('cors');
const app = express();
const port = 5000;
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  // Send email

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'jtorresuci@gmail.com',
        pass: process.env.GMAIL_PASSWORD,
      },
    tls: {
        rejectUnauthorized: false
    }
});

  const mailOptions = {
    from: 'jtorresuci@gmail.com',
    to: 'jtorresuci@gmail.com',
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: error });
    } else {
      console.log(`Email sent: ${info.response}`);
      res.json({ success: true });
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
