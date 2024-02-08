const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT ||3000
const clientes = require('./routes/clientes')
const reservas = require('./routes/reservas')
const habitaciones = require('./routes/habitaciones')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/clientes', clientes)
app.use('/reservas', reservas)
app.use('/habitaciones', habitaciones)


mongoose.connect('mongodb://127.0.0.1:27017/hotel')
.then(console.log('Mongoose Conectado'))
.catch((err) => console.log('Mongoose no conectado: ' + err))


app.listen(PORT, (err) =>
    err
        ? console.log("Servidor fallido")
        : console.log("Servidor conectado en el puerto: " + PORT))