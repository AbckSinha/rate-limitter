"use strict";


const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const rateLimit = require('express-rate-limit');


const port = 4201;

const limiter = rateLimit({
    max: 5,
    windowMs: 60 * 60 * 1000,
    message: "Too many request from this IP"
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(limiter); // will limit below get call after continuous 5 hits

app.get("/", function (request, response) {
    response.send({
        status: "success",
        msg: "welcome to test api for rate limitter"
    });
});



app.listen(port, function (err) {
    if (err) {
        console.log("Error while starting server");
    }
    else {
        console.log("Server has been started at " + port);
    }
});