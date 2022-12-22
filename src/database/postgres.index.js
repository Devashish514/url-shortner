const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    "postgres", //DB Name
    "postgres", //user
    "test123", //password
    {
        host: "localhost",
        dialect: "postgres"
    }
);

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