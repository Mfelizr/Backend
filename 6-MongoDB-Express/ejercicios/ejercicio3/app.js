const express = require('express')
const app = express()
const {MongoClient} = require('mongodb')
const PORT = process.env.PORT ||3000

//let { MongoClient, ObjectId } = require('mongodb')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(express.static('public'))

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

// 1- Buscar Series
app.get('api/series', async(res, req) =>{
    try {
        const results = await app.locals.db.collection('series').find().toArray()
        res.send({mensaje: 'Peticion realizada', results})
    } catch (error) {
        res.send({mensaje: 'Error en la peticion', error})        
    }
})

// 2 - Buscar Serie
app.get('api/series/:serie', async(res, req) =>{
    try {
        const results = await app.locals.db.collection('series').find({titulo:req.params.titulo}).toArray()
        results.length > 0
        ? res.send({mensaje: 'Peticion realizada', results})
        : res.send({mensaje: 'No hay registros para mostrar'})
        
    } catch (error) {
        res.send({mensaje: 'Error en la petición', error})        
    }
})

app.post('/api/nuevaSerie/', async(req, res)=>{
    try {        
      let {titulo, plataforma, nota}  = req.body
      const results = await app.locals.db.collection('series').insertOne({titulo:req.query.titulo, plataforma: req.query.plataforma, nota: req.query.nota})
      res.status(200).send({mensaje: "Nueva Serie insertada", results})
    } catch (error) {
        res.status(500).send({mensaje: "No insertada"})
    }
})

app.listen(PORT, (e) => {
    e
        ? console.error('🔴 Error al conectar Express')
        : console.log('🟢 Express conectado y a la escucha en el puerto: ' + PORT)
})