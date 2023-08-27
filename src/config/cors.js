const cors = require("cors");

const allowlist = process.env.ALLOWED_CORS_DOMAINS.split(',')
const corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }
    } else {
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
}
  
const initializeCors = (app) => {
    // app.use(cors(corsOptionsDelegate));
    app.use(cors('*'))
    return app
}

module.exports = initializeCors