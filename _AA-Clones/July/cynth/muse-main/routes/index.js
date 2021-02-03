const fs = require('fs')
const router = require("express").Router();

// Read all file names within the ./api directory
const fileNames = fs.readdirSync('./routes/api');

// slice the file extensions off
const routes = fileNames.map(fileName => fileName.slice(0,fileName.indexOf('.')))

// loop though routes to establish them in the application
for (let route of routes) {
  router.use(`/api/${route}`, require(`./api/${route}`));
}

module.exports = router;
