module.exports = {
  404: (req, res, next) => res.render("404"),
  signIn: (req, res, next) => {
    if (req.headers["X-Replit-User-Name"]) {
      res.locals.signedIn = false;
    } else {
      res.locals.username = req.headers["X-Replit-User-Name"];
    }
    next();
  }
};