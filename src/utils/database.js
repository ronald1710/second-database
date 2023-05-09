//vamos a gestionar la conexion con una base de datos
//importar sequelize
const {Sequelize} = require ('sequelize');

//crear instancia de sequelize con la configuracion de conexion

const db = new Sequelize({
    host:'localhost',
    database: "users_crud",
    port: 5432,
    username: "postgres",
    password:"Smrs1610",
    dialect: "postgres",
});

//export default 
module.exports = db;