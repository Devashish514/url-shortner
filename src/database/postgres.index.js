const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    ssl:false
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