const router = require("express").Router();
const User = require("../models/User.model");

const loginCheck = () => {
  return (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.redirect("/login");
    }
  }
}

/* GET home page */
// router.get("/", (req, res, next) => {
//   //const user = req.session.user;
//   res.render("index", { user : req.session.user});
//   // res.render("index");
// });

router.get("/", (req, res, next) => {
  const user = {
    layout: false
  }
  res.render("index", user );
  // res.render("index");
});

router.get("/home", loginCheck(), (req, res) => {
   res.render("home");
});


module.exports = router;
