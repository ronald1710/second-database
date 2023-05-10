//vamos a gestionar la conexion con una base de datos
//importar sequelize
const {Sequelize} = require ('sequelize');
require('dotenv').config();

//crear instancia de sequelize con la configuracion de conexion

const db = new Sequelize({
    host:process.env.DB_HOST, //ver linea 20,21 y 22
    database: process.env.DB_NAME, //sale del dqatabase de render
    port: process.env.DB_PORT, //port de render
    username: process.env.DB_USERNAME, //username de render
    password:process.env.DB_PASSWORD, //password de render
    dialect: "postgres",
    dialectOptions:{ ssl: { require: true, rejectUnauthorized: false }}
});

//export default 
module.exports = db;


//external databaseurl de render
//postgres://razo:74XTIM0X14yMn8HKB33Ejha1dgoEItBe@dpg-chdf7frhp8u3v707imc0-a.oregon-postgres.render.com/users_crud_ekj2
//despues del @ hasta el .com es el host