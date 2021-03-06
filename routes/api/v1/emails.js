var express = require("express");
var router = express.Router();
const axios = require("axios");
const models = require("../../../models");

// loading post mark server token
require("dotenv").config();
const postmarkServerToken = process.env.POSTMARK_SERVER_TOKEN;

const EmailModel = models.emails;

router.post("/", (req, res) => {
  const email = {
    sender: req.body.sender,
    recepient: req.body.recepient,
    subject: req.body.subject,
    body: req.body.body,
  };

  axios
    .post(
      "https://api.postmarkapp.com/email",
      {
        From: email.sender,
        To: email.recepient,
        Subject: email.subject,
        TextBody: email.body,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Postmark-Server-Token": postmarkServerToken,
        },
      }
    )
    .then(() => {
      emailModel = new EmailModel(email);
      emailModel
        .save()
        .then((savedEmail) => {
          res.status(200).json(savedEmail);
        })
        .catch((err) => {
          res
            .status(500)
            .json({ error: "Error while saving email to the database" });
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "Error while sending email using postmark" });
    });
});

router.get("/", (req, res) => {
  // for now i find by this email only however it needs to be changed to load the email 
  // from the jwt token by adding a middleware for this endpoint this middleware adds
  // the user to req.user so can be accessed here and therefore accessing the email
  EmailModel.find({ sender: "omarkojaks@gmail.com" }).exec(function (
    sentEmailsFindErr,
    sentEmails
  ) {
    EmailModel.find({ recepient: "omarkojaks@gmail.com" }).exec(function (
      receivedEmailsFindError,
      receivedEmails
    ) {
      if (sentEmailsFindErr || receivedEmailsFindError) {
        res.status(500).json({ error: "Error while fetching emails" });
      }
      res.status(200).json({
        sentEmails,
        receivedEmails,
      });
    });
  });
});

module.exports = router;
