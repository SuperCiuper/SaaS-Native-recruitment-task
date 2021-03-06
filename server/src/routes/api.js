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
	}, number);

	value = value.toString().split("");
	let output = (value[1] ? value[1] : 0) + (value[6] ? value[6] : 0) + (value[value.length - 1] ? value[value.length - 1] : 0);

	return output;
};

router.post("/apiaries", (req, res, next) => {
	let newApiary = req.body;

	try {
		if (newApiary.name == "") return res.status(406).json("Name not specified");
	} catch (error) {
		console.log(error);
		return res.status(406).json("Name is not correct");
	}

	try {
		let date = new Date();
		newApiary.date = date.toLocaleDateString("pl-PL");

		let number = date.toISOString().split("T")[0];
		number = number.split("-").join("");

		// sort by date then id to allow finding first free id number
		apiaryList.sort((a, b) => {
			return a.number.slice(0, -3) - b.number.slice(0, -3);
		});

		let val = apiaryList
			.filter((item) => newApiary.date === item.date)
			.reduce((previousVal, item) => {
				return parseInt(item.number.slice(8, -3)) === previousVal ? ++previousVal : previousVal;
			}, 1);

		if (newApiary.number === "") number += String(val).padStart(5, "0");
		else if (newApiary.number <= 0 || newApiary.number >= 100000) return res.status(406).json("Number has to be in range 1 - 99999");
		else if (newApiary.number < val) return res.status(406).json("Number already taken, you can try to get it tommorow");
		else number += String(newApiary.number).padStart(5, "0");

		number += calculateControlSum(number);
		newApiary.number = number;
		apiaryList.push(newApiary);

		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.status(500).json("Unknown error during code generation");
	}
});

module.exports = router;
