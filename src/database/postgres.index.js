require("dotenv").config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    host: process.env.DATABASE_HOST,
    port: 5432,
    dialect: "postgres"
});

sequelize.sync();

(async () => {
    try {
        await sequelize.authenticate();
        console.log(`DB Connected.`);
    } catch (error) {
        console.log(error);
    }
})();

module.exports = sequelize;