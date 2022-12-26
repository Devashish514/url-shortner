const { Client } = require('pg')


// const client = new Client({
//     user: 'dg',
//     host: 'dpg-ceklefcgqg4ekmfhruj0-a',
//     database: 'mydb_d55k',
//     password: 'EqFOqduopSEhDPqaoPbmk5MVQynqW0dm',
//     port: 5432,
// })
// client.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
// });








const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    url: "postgres://dg:EqFOqduopSEhDPqaoPbmk5MVQynqW0dm@dpg-ceklefcgqg4ekmfhruj0-a/mydb_d55k",
    dialect: "postgres"
});

// sequelize.sync();

(async () => {
    try {
        await sequelize.authenticate();
        console.log(`DB Connected.`);
    } catch (error) {
        console.log(error);
    }
})();

module.exports = sequelize;