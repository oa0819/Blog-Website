const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//* require express.urlencoded and express.static for POST and PUT method


//! middleware - func BETWEEN processing req and sending res

//** */ express.json() - IDENTIFY incoming data as JSON obj
//TODO: express.urlencoded() - IDENTIFY incoming data as strings or arrays

/* use bodyParser alternatively*/
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));//to serve static files such as images,CSS,JS

app.set("view engine", "ejs");



app.use(require("./routes/index"))
app.use(require("./routes/compose"))
app.use(require("./routes/blog"))

app.listen(3000);