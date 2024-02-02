const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT ||3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const {Disco, Artista} = require('./schemas')

mongoose.connect('mongodb://127.0.0.1:27017/mongodb_express')
.then(console.log('Mongoose Conectado'))
.catch((err) => console.log('Mongoose no conectado: ' + err))

//prueba
/* const newArtista = new Artista({_id: new mongoose.Types.ObjectId(),
    nombre: "Shakira", genero:"Pop", fechaDeNacimiento:"01/01/2000", nacionalidad:"colombiana", nombreArtistico:"Shaki"
})
newArtista.save().then(console.log("Artista creada")).catch(e=>console.error("Artista no creado"+e))

const newDisco = new Disco({_id: new mongoose.Types.ObjectId(),    
    titulo:"Las mujeres",
            artista:newArtista._id,    
            anno:2023,
            genero:"Pop",
            stock:5,
            formato:"Digital"
})
newDisco.save().then(console.log("Disco creada")).catch(e=>console.error("Disco no creado"+e))
 */

//Buscar todos
app.get('/discos', async(req, res) => {
    try {        
        let results = await Disco.find({stock: {$gt:0}})        
        //res.send({mensaje: "Busqueda realizada", results})
        results.length < 1
        ?res.send({mensaje: "No hay resultados para la busqueda", results})
        :res.send({mensaje: "Busqueda realizada", results})
    } catch (error) {
        res.send({mensaje: "No se ha podido completar la busqueda", error})        
    }
});

//Buscar por titulo o por Id
app.get('/discos/:titulo_id', async(req, res) => {
    try {
        if (mongoose.isObjectIdOrHexString(req.params.titulo_id)) {
            console.log("Parametros 1: ", req.params)    
            const results = await Disco.findbyId(req.params.titulo_id).populate('artista')
        }                
        else {
            if (req.params.titulo_id) {
                console.log("Parametros 2: ", req.params.titulo_id)    
                const results = await Disco.find({titulo: req.params.titulo_id})
        }   }     
        console.log("Parametros 3: ", req.params.titulo_id, "Res: ", results)
        results.length < 1
        ?res.send({mensaje: "No hay resultados para la busqueda", results})
        :res.send({mensaje: "Busqueda realizada", results})
    } catch (error) {
        res.send({mensaje: "No se ha podido completar la busqueda", error})        
    }
});

app.post('/artista/anyadir', async (req, res) => {
    try {
        console.log(req.body)                
        const results = await Artista.create(req.body)        
        res.send({mensaje: "Nuevo artista añadido", results})
    } catch (error) {
        res.send({mensaje: "No ha sido posible añadir artista", error})
    }
})

app.post('/discos/anyadir', async (req, res) => {
    try {
        const {titulo, artista, anno, genero, stock, formato} = req.body
        const newDisco = new Disco({
            titulo, artista, anno, genero, stock, formato})
        const results = await newDisco.save()
        res.send({mensaje: "Nuevo disco añadido", results})
    } catch (error) {
        res.send({mensaje: "No ha sido posible añadir disco", error})
    }
})

app.put('/artista/:id', async (req, res) => {
    try {        
        const results = await Artista.findByIdAndUpdate(req.params.id, req.body, {new: true})        
        res.send({mensaje: "Artista actualizado", results})
    } catch (error) {
        res.send({mensaje: "No ha sido posible actualizar los datos del artista", error})
    }
})

app.delete('/artista/borrar/:id', async (req, res) => {
    try {
        const results = await Artista.findByIdAndDelete(req.params.id)        
        res.send({mensaje: "Artista eliminado", results})
    } catch (error) {
        res.send({mensaje: "No ha sido posible eliminar al artista", error})
    }
})

app.delete('/disco/borrar/:id', async (req, res) => {
    try {
        const results = await Disco.findByIdAndDelete(req.params.id)        
        res.send({mensaje: "Disco eliminado", results})
    } catch (error) {
        res.send({mensaje: "No ha sido posible eliminar el disco", error})
    }
})

app.listen(PORT, (err) =>
    err
        ? console.log("Servidor fallido")
        : console.log("Servidor conectado en el puerto: " + PORT))
