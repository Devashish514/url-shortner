const { DataTypes } = require("sequelize");
const sequelize = require("../database/postgres.index");

const Url = sequelize.define("url", {
    uuid: {
        type: DataTypes.STRING
    },
    urlCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    longUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shortUrl: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = { Url }