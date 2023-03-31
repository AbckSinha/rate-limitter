"use strict";


const express = require('express');
const bodyParser = require("body-parser");
const rateLimit = require('express-rate-limit');
const app = express();

const port = 8091;

const limiter = rateLimit({
    max: 10,
    windowMs: 60 * 60 * 1000,
    message: "Too many request from this IP"
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));

app.get("/", function (request, response) {
    return {
        status: "success",
        msg: "welcome to test api for rate limitter"
    }
});

app.use(limiter);

app.listen(port, function (err) {
    if (err) {
        console.log("Error while starting server");
    }
    else {
        console.log("Server has been started at " + port);
    }
});