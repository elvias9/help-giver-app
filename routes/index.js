const router = require("express").Router();

// const loginCheck = () => {
//   return (req, res, next) => {
//     if (req.session.user) {
//       next();
//     } else {
//       res.redirect("/login");
//     }
//   }
// }

/* GET home page */
// router.get("/", (req, res, next) => {
//   const user = req.session.user;
//   res.render("index", {user: user});
// });

// router.get("/home", loginCheck(), (req, res) => {
//   res.render("home");
// });

router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
