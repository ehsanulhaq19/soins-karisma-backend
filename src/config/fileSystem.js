const express = require("express");
const path = require('path');

const initialize = (app) => {
    const publicFolderPath = path.join(__dirname,'/../../public')
    const publicFolderAsset = express.static(publicFolderPath)

    //config app file system
    app.use(publicFolderAsset);
    
    return app
}

module.exports = initialize