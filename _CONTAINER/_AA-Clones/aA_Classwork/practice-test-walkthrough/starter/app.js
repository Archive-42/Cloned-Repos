/**
 * TODO: Create and configure your Express.js application in here.
 *       You must name the variable that contains your Express.js
 *       application "app" because that is what is exported at the
 *       bottom of the file.
 */
const express = require("express");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const { HairColor, Person } = require('./models');

const app = express();
const csrfProtection = csrf({ cookie: true });

app.set("view engine", "pug");

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res, next).catch(next);

app.get("/new-person", csrfProtection, asyncHandler(async (req, res, next) => {
  // display new form with Hair Color options from DB
  const hairColors = await HairColor.findAll();
  res.render("new-person-form", {hairColors, csrfToken: req.csrfToken()});
}));

app.post("/new-person", csrfProtection, asyncHandler(async (req, res, next) => {
  // deal with input entry from user and create Person in DB
  const {firstName, lastName, age, biography, hairColorId} = req.body;
  await Person.create({
    firstName, lastName, age, biography, hairColorId
  })
  res.redirect('/')
}));

app.get("/", asyncHandler(async (req, res, next) => {
  // display table of all people including their hair color
  const people = await Person.findAll({include: HairColor})
  res.render("people-index", {people});
}));

app.listen(8080, () => console.log("listening on port 8080"))

/* Do not change this export. The tests depend on it. */
try {
  exports.app = app;
} catch (e) {
  exports.app = null;
}
