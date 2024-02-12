const express = require('express')
const app = express()
const {MongoClient} = require('mongodb')
const PORT = process.env.PORT ||3000
const menus = require('./routes/menus')
const hamburguesas = require('./routes/hamburguesas')
const bebidas = require('./routes/bebidas')
const pedidos = require('./routes/pedidos')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(express.static('public'))
app.use('/menus', menus)
app.use('/hamburguesas', hamburguesas)
app.use('/bebidas', bebidas)
app.use('/pedidos', pedidos)


const client = new MongoClient('mongodb://127.0.0.1:27017')

async function connectMongo() {
    try {
        await client.connect().then((client) => app.locals.db = client.db('mongodonal'))
        console.log('🟢 MongoDB conectado')
    } catch (error) {
        console.error('🔴 MongoDB no conectado')
    }
}
connectMongo()


app.listen(PORT, (e) => {
    e
        ? console.error('🔴 Error al conectar Express')
        : console.log('🟢 Express conectado y a la escucha en el puerto: ' + PORT)
})