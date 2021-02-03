const express = require('express');
const router = express.Router();
const { userValidation } = require('../auth');




router.get("/", userValidation, (req, res) => {
  res.render("index");
});


router.get("/lists", (req, res) => {
  res.render("index");
});

router.get("/register", userValidation, (req, res) => {
  res.render("register");
});

router.get("/sign-in", userValidation, (req, res) => {
  res.render("sign-in");
});

router.get("/terms", (req, res) => {
  res.render("terms");
});

router.get("/privacy", (req, res) => {
  res.render("privacy");
});

router.get("/reset-request", (req, res) => {
  res.render("reset-request");
});

module.exports = router;
