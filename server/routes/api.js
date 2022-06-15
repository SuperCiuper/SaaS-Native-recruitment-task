var express = require("express");
var router = express.Router();

var apiaryList = [];

router.get("/", function (req, res, next) {
  res.render("index", { title: "Apiary API" });
});

router.get("/apiaries", (req, res, next) => {
  return res.json(apiaryList);
});

router.post("/apiaries", (req, res, next) => {
  console.log(req.body);

  res.send("Its pasieka time");
});

module.exports = router;
