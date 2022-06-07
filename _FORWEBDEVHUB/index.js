const app = require("express")();
const fetch = require("node-fetch");
const ejs = require("ejs");

const projects = require("./projects");
const route = require("./route");

app.engine("html", ejs.renderFile);
app.set('view engine', "html");
app.set('views', __dirname + '/temp');

app.use(route.signIn);

app.use(require("express").static(__dirname + "/public"));

app
  .get("/", (req, res) => {
    res.render("index")
  })
;

app.use(route[404])

app.listen(8080);

console.log("CoderGod");