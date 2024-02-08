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

//1-Buscar libros
app.get('/api/libros', async(req, res) =>{
    try {
        const results = await app.locals.db.collection('libros').find().toArray()
        results.length > 0
        ? res.send({mensaje: 'Busqueda realizada satisfactoriamente', results})
        : res.send({mensaje: 'No existen registros para mostrar', results})
    } catch (error) {
        res.send({mensaje: 'Error en la petición', error})        
    }
})

// 2 - Buscar libros por titulo
app.get('/api/libros/:titulo', async(req, res) =>{
    console.log ("Titulo parametro: ", req.params.titulo)
    try {
        const results = await app.locals.db.collection('libros').find({titulo: req.params.titulo}).toArray()
        results.length > 0
        ? res.send({mensaje: 'Busqueda realizada satisfactoriamente', results})
        : res.send({mensaje: 'No existen registros para mostrar', results})        
    } catch (error) {
        res.send({mensaje: 'Error en la petición', error})        
    }
})
//3 - Añadir libro
app.post('/api/nuevoLibro/:titulo', async(req, res)=>{
    try {        
      const results = await app.locals.db.collection('libros').insertOne({titulo:req.params.titulo, leido: false})  
      res.status(200).send({mensaje: "Libro insertado", results})
    } catch (error) {
        res.status(500).send({mensaje: "No se ha insertado ningun libro"})
    }
})
// 4 - Edita el libro para cambiar a leido
app.put('/api/editarLibro/:titulo', async(req, res)=>{
    try {        
      const results = await app.locals.db.collection('libros').updateOne({titulo:req.params.titulo}, {$set: {leido:true}})  
      res.status(200).send({mensaje: "Libro actualizado a leido", results})
    } catch (error) {
        res.status(500).send({mensaje: "No se ha actualizado ningun libro"})
    }
})
//5 - Borra libro
app.delete('/api/borrarLibro/:titulo', async(req, res)=>{
    try {        
      const results = await app.locals.db.collection('libros').deleteOne({titulo:req.params.titulo})  
      results.deletedCount < 1
      ?res.send({mensaje: "Libro no borrado", results})
      :res.status(200).send({mensaje: "Libro borrado", results})
      
    } catch (error) {
        res.status(500).send({mensaje: "No se ha borrado ningun libro"})
    }
})

app.listen(PORT, (e) => {
    e
        ? console.error('🔴 Error al conectar Express')
        : console.log('🟢 Express conectado y a la escucha en el puerto: ' + PORT)
})
