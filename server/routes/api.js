var express = require("express");
var router = express.Router();

var apiaryList = [];

router.get("/", function (req, res, next) {
  res.render("index", { title: "Apiary API" });
});

router.get("/apiaries", (req, res, next) => {
  return res.json(apiaryList);
});

const calculateControlSum = (number) => {
  let value = number.split("").reduce((previousVal, item) => {
    return item != 0 ? (previousVal *= item) : previousVal;
  }, 1);

  value = value.toString().split("");
  let output =
    (value[1] ? value[1] : 0) +
    (value[6] ? value[6] : 0) +
    (value[value.length] ? value[value.length] : 0);

  return output;
};

router.post("/apiaries", (req, res, next) => {
  console.log(req.body);
  let newApiary = req.body;

  try {
    if (newApiary.name == "") res.sendStatus(404);
  } catch (error) {
    console.log(error);
    return res.status(404).json("Name is not correct");
  }

  try {
    let date = new Date();
    newApiary.date = date.toLocaleDateString("pl-PL");
    console.log(newApiary);

    let number = date.toISOString().split("T")[0];
    number = number.split("-").join("");

    let val =
      apiaryList.filter((item) => newApiary.date === item.date).length + 1;

    if (newApiary.number === "") number += String(val).padStart(5, "0");
    else if (newApiary.number <= 0 || newApiary.number >= 100000)
      return res.status(404).json("Number has to be in range 1 - 99999");
    else if (newApiary.number < val)
      return res
        .status(404)
        .json("Number already taken, you can try to get it tommorow");
    else number += String(newApiary.number).padStart(5, "0");

    number += calculateControlSum(number);
    newApiary.number = number;
    console.log(newApiary);
    apiaryList.push(newApiary);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(404).json("Unknown error during code generation");
  }
});

module.exports = router;
