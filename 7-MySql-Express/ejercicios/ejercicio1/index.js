const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const app = express();
const mysql = require('mysql')
const PORT = process.env.PORT || 3000;

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())



const connection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
})

connection.connect((err) => {
    err
        ? console.error("No se ha podido conectar a MySQL: ", err.stack)
        : console.log("MySQL conectado con el ID: ", connection.threadId)
})


//CRUD
app.get('/api/menus', (req, res) => {
    connection.query('SELECT * FROM `menu`;', (err, results) => {
        err
            ? res.send({mensaje: "No se ha podido realizar la consulta: ", err})
            : results.length > 0
                ? res.send({ mensaje: "Consulta realizada", results })
                : res.send({ mensaje: "Consulta realizada sin resultados", results })
    })
})

app.post('/api/nuevoMenu', (req, res) => {
    console.log("Datos: ", req.body)    
    let { numeroMenu, primerPlato, segundoPlato, postre, precio} = req.body
    connection.query('INSERT INTO menu (primerPlato, segundoPlato, postre, precio) VALUES (?,?,?,?)', [primerPlato, segundoPlato, postre, precio], (err, results) => {
        err
            ? res.send({ mensaje: "No se ha podido agregar el menu: ", err })
            : results.insertId != null
                ? res.send({ mensaje: "Menu agregado", results })
                : res.send({ mensaje: "No se ha podido insertar en la BBDD", results })
    })
})

app.put('/api/editarMenu/:id', (req, res) => {    
    console.log("Datos: ", req.body)
    let {numeroMenu, primerPlato, segundoPlato, postre, precio} = req.body
    const numMenu = req.params.id;
    connection.query("Update menu Set primerPlato=?, segundoPlato=?, postre=?, precio=? WHERE id = ?", 
    [primerPlato, segundoPlato, postre, precio, numMenu], (err, results) => {
        err
            ? res.send({ mensaje: "No se ha podido actualizar el menu: ", err })
            : results.changedRows > 0
                ? res.send({ mensaje: "Menu actualizado", results })
                : res.send({ mensaje: "No se ha podido encontrar el menu especificado", results })
    })
})

app.delete('/api/borrarMenu/:id', (req, res) => {    
    console.log("Datos: ", req.body)    
    const numMenu = req.params.id;
    connection.query("Delete from menu WHERE numeroMenu = ?",
        [numMenu], 
        (err, results) => {
        err
            ? res.send({ mensaje: "No se ha podido eliminar el menu: ", err })
            : results.affectedRows > 0
                ? res.send({ mensaje: "Menu eliminado", results })
                : res.send({ mensaje: "No se ha podido encontrar el menu especificado", results })
    })
})

app.listen(PORT, (e) => {
    e
        ? console.error("🔴 Express no conectado")
        : console.log("🟢 Express conectado y a la escucha en el puerto: " + PORT)
})