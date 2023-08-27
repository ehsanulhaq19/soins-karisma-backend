const express = require("express");
require('dotenv').config()
const appConfig = require('./src/config/app')
const app = express();

//app configurations
appConfig.config(app)

//set port, listen for requests
const PORT = process.env.APP_PORT || 8000;
app.listen(PORT, () => {
    console.log (`Server is running on port ${PORT}.`);
});