const userLogged = require("./userLoggedMiddleware");

module.exports = (req, res, next) => {
  let user = req.session.userLogged;
  if (!user || user.admin == 0) {
    res.render(
      "access-forbidden"
    )} else {
    next();
    ;
  }
};
