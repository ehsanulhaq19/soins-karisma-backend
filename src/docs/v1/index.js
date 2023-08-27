const meta = require('./meta')
const components = require('./components')
function index() {
    return {
        ...meta,
        ...components,
        security: [{
            apiKey: []
        }],
    }
}

module.exports = index()