const express = require("express");
const bodyParser = require("body-parser");
const { readFile, writeFile } = require("fs").promises;

const app = express();
app.use(bodyParser.json());

app.listen(5000, () => {
	console.log("server listening on port 5000");
});