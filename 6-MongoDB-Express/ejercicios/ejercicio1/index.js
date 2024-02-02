const express = require('express')
const app = express()
const {MongoClient} = require('mongodb')
const PORT = process.env.PORT ||3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const client = new MongoClient('mongodb://127.0.0.1:27017')

async function connectMongo() {
    try {
        await client.connect().then((client) => app.locals.db = client.db('mongodb_express'))
        console.log('🟢 MongoDB conectado')
    } catch (error) {
        console.error('🔴 MongoDB no conectado')
    }
}

connectMongo()

// Busca las mesas
app.get('/api/mesas', async (req, res) => {
    try {
        const results = await app.locals.db.collection('mesas').find().toArray()
        res.send({mensaje: "Realizada la petición correctamenta", results})
    } catch (error) {
        res.send({mensaje: "Error en la petición", error})
    }
})

// Añadir mesa
app.post('/api/anyadir', async (req, res) => {    
    try {
        const {tamaño, color, material, patas} = req.body
        const results = await app.locals.db.collection('mesas').insertOne({tamaño, color, material, patas})
        res.send({mensaje: "El artículo se ha insertado correctamente.", results})
    } catch (error) {
        res.send({mensaje: "No se ha insertado el artículo.", error})
    }
})

// Actualizar el color masivamente
app.put('/api/modificar/:color', async (req, res) => {    
    try {
        const results = await app.locals.db.collection('mesas').updateMany({color: req.params.color}, {$set: {color: "Granate"}})
        res.send({mensaje: "Los artículos se ha actualizado correctamente.", results})
    } catch (error) {
        res.send({mensaje: "No se ha actualizado ningun artículo.", error})
    }
})

// Borrar de acuerdo a las patas
app.delete('/api/borrar/:patas', async (req, res) => {    
    try {
        const patas = parseInt(req.params.patas)
        const results = await app.locals.db.collection('mesas').deleteMany({patas: patas})
        res.send({mensaje: "Los artículos se han eliminado correctamente.", results})
    } catch (error) {
        res.send({mensaje: "No se ha eliminado ningun artículo.", error})
    }
})


app.listen(PORT, (e) => {
    e
        ? console.error('🔴 Error al conectar Express')
        : console.log('🟢 Express conectado y a la escucha en el puerto: ' + PORT)
})



