const bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerDocumentV1 = require('../docs/v1/index.js');
const connection = require('./database/connection')
const cors = require("./cors")
const fileSystem = require("./fileSystem")
const {apiRoutes, webhookRoutes} = require('../routes');

function config(app) {
    //cors configurations
    app = cors(app)
    //init filesystem
    app = fileSystem(app)
    // parse requests of content-type - application/json
    app.use(bodyParser.json());
    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({extended:true}));
    //initialize DB
    connection.initialize();
    //api routes
    app.use('/api', apiRoutes);
    //webhook routes
    app.use('/webhook', webhookRoutes);
    //swagger documentation
    app.use('/api/v1', swaggerUi.serveFiles(swaggerDocumentV1, {
        swaggerOptions: {
            displayOperationId: true
        }
    }), swaggerUi.setup(swaggerDocumentV1, {}));

}

module.exports = {
    config
}