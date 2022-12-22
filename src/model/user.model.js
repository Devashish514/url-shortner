const { DataTypes } = require("sequelize");
const sequelize = require("../database/postgres.index");

const User = sequelize.define("User", {
    uuid: {
        type: DataTypes.STRING
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:true
    }
});

module.exports = { User };