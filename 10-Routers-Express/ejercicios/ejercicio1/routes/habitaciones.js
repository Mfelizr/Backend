const express = require('express')
const router = express.Router()
const {Habitacion} = require('./schemas')


//Registramos una nueva habitacion
router.post('/add', async(req, res)=>{
    try {
        console.log(req.body)                   
        const resultsExiste = await Habitacion.find({numeroHabitacion: req.body.numeroHabitacion})        
        if (resultsExiste.length > 0)
            res.send({mensaje: "La habitación ya existe, favor verificar."})                
        else {
            const {numeroHabitacion} = req.body
            const results = await Habitacion.create({numeroHabitacion: numeroHabitacion, libre: true})        
            res.send({mensaje: "Nueva habitacion añadida", results})
        }        
    } catch (error) {
        res.send({mensaje: "No ha sido posible añadir habitacion", error})
    }
})
//Ocupar habitacion
router.put('/ocupar/:numHabitacion', async(req, res) => {    
    try {        
        const results = await Habitacion.findOneAndUpdate({numeroHabitacion: req.params.numHabitacion}, {libre:false})        
        res.send({mensaje: "Habitación ocupada", results})        
    } catch (error) {
        res.send({mensaje: "No ha sido posible actualizar los datos de la habitacion", error})
        
    }
})
//Liberar habitacion
router.put('/liberar/:numHabitacion', async(req, res) => {    
    try {        
        const results = await Habitacion.findOneAndUpdate({numeroHabitacion: req.params.numHabitacion}, {libre:true})        
        res.send({mensaje: "habitacion liberada", results})        
    } catch (error) {
        res.send({mensaje: "No ha sido posible actualizar los datos del habitacion", error})
        
    }
})

module.exports = router