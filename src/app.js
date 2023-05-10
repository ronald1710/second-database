//importamos express
const express = require("express");
//importar modulo de la db
const db = require("./utils/database");
const Users = require("./models/users.model");
const { where } = require("sequelize");
require ('dotenv').config();
const PORT=process.env.PORT || 8000;
//metodo de sequelize, es un metodo asincrono
db.authenticate()
  .then(() => console.log("base de datos conectada"))
  .catch((err) => console.log(err));
// para comparar el modelo creado y la base de datos
db.sync()
  .then(() => console.log("base de datos sincronizada"))
  .catch((err) => console.log(err));

//creamos instancia de express
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("servidor arriba");
});

app.post("/users", async (req, res) => {
  try {
    const newUser = req.body;
    await Users.create(newUser);
    res.status(201).send();
  } catch (error) {
    res.status(400).json(error);
  }
});

//obtener a todos los usuarios de la base de datos (todos los usuarios)

// app.get('/users', async (req, res)=>{
//     try{
//         const users = await Users.findAll();
//         res.json(users);
//     }
//     catch (error){
//         res.status(400).json(error)
//     }
// })

//select (firstname, lastname, email, password)
//forma 1

// app.get('/users', async (req, res)=>{
//     try{
//         const users = await Users.findAll({
//             attributes: [ 'firstname', 'lastname', 'email']
//             }
//         );
//         res.json(users);
//     }
//     catch (error){
//         res.status(400).json(error)
//     }
// })

//forma 2 utilizando exclude

// app.get('/users', async (req, res)=>{
//     try{
//         const users = await Users.findAll({
//             attributes:
//             {exclude: ['password']}
//             }
//         );
//         res.json(users);
//     }
//     catch (error){
//         res.status(400).json(error)
//     }
// })

//get user by id

app.get("/users/id/:id", async (req, res) => {
  try {
    //para recuperar el parametro de ruta ==> req.params, es un objeto que va a tener todos y cada uno de los valoes de la tabla
    const { id } = req.params;
    console.log(req.params);
    const user = await Users.findByPk(id, {
      attributes: {
        exclude: ["password"],
      },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

//que pasa si quiero encontrar por otro campo

app.get("/users/email/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await Users.findOne({
      where: { email },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

//como eliminar un usuario
//DELETE FROM users WHERE id=3;  ==>elimina al usuario con id 3

app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Users.destroy({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json(error);
  }
});

//update
//UPDATE users SET firsname="nuevo valor, lastname="nuevo valor WHERE id="x"

app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname } = req.body;
    //actualizan nombre
    //actualizan apellido
    //actualizan los dos
    await Users.update(
      { firstname, lastname },
      {
        where: { id },
      }
    );
    res.status(204).send();
  } catch (error) {
    res.status(400).json(error);
  }
});

//dejar escuchando a nuestro servidor
app.listen(PORT, () => {
  console.log(`servidor escuchando en el puerto ${PORT}` );
});

//comprobando conexion a la db

console.log(process.env)
