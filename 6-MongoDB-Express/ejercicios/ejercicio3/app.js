const express = require('express')
const app = express()
const {MongoClient} = require('mongodb')
const PORT = process.env.PORT ||3000

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
app.get('/api/series', async(req, res) =>{
    try {
        const results = await app.locals.db.collection('seriestv').find().toArray()
        res.send({mensaje: 'Consulta realizada', results})
    } catch (error) {
        res.send({mensaje: 'Error en la consulta', error})        
    }
})

// 2 - Buscar Serie
app.get('/api/series/:serie', async(req, res) =>{
    console.log("Parametro: ", req.params.serie)
    try {
        const results = await app.locals.db.collection('seriestv').find({titulo:req.params.serie}).toArray()
        results.length > 0
        ? res.send({mensaje: 'Consulta realizada', results})
        : res.send({mensaje: 'No hay registros para mostrar'})
        
    } catch (error) {
        res.send({mensaje: 'Error consultando serie', error})        
    }
})

//3- Inserta serie
app.post('/api/nuevaSerie/', async(req, res)=>{
    console.log("BODY: ", req.body)
    try {        
      let {titulo, plataforma, nota}  = req.body
      nota = parseInt(nota)
      const results = await app.locals.db.collection('seriestv').insertOne({titulo, plataforma, nota})
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