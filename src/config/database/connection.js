const Sequelize = require("sequelize");
const parameters = require("./parameters")

const initialize = () => {
    const nodeEnv = process.env.NODE_ENV
    const sequelize = new Sequelize(
        parameters[nodeEnv].database,
        parameters[nodeEnv].username,
        parameters[nodeEnv].password,
        {
            host: parameters[nodeEnv].host,
            dialect: 'postgres'
        }
    );
       
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch((error) => {
        console.error('Unable to connect to the database: ', error);
    });
}

module.exports = {
    initialize
}