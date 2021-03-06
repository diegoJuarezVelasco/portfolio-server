const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const { application } = require("express");
var bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com", //replace with your email provider
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

//Home route
app.use(cors());

//Habilitar express.json
app.use(express.json({ extend: true }));

//Puerto de la app
const PORT = process.env.PORT || 4000;

app.listen(PORT,'0.0.0.0');

app.post("/send", (req, res, next) => {
  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phone;
  var message = `Mensaje: ${req.body.message}\nCorreo: ${email}\nTelefono: ${phone} `;

  var mail = {
    from: name,
    to: 'diego_j_v@live.com.mx',
    text: message,
    subject: 'portfolio'
  };
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).json(req.body);
    }
  });
});