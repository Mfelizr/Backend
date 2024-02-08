const express = require('express')
const router = express.Router()
const {Cliente, Reserva, Habitacion} = require('./schemas')
const clientes = require('./clientes')
const { now } = require('mongoose')

router.use('/clientes', clientes)

//Rutas

//anadir reserva
//Registramos reserva verificando previamente que exista el cliente y que este libre la habitacion
router.post('/checkIn', async(req, res)=>{
    let idCliente, idHabitacion = ""
    try {
        console.log(req.body)                   
        const resultsValidaCliente = await Cliente.find({dni: req.body.dni})        
        if (resultsValidaCliente.length < 1)
            res.send({mensaje: "El cliente no existe, favor registrarlo."})                
        else {
            console.log("Cliente: ", resultsValidaCliente[0]._id)
            //guarda el id del cliente
            idCliente = resultsValidaCliente[0]._id 
            const resultsValidaHabitacion = await Habitacion.find({numeroHabitacion: req.body.numeroHabitacion, libre: true})  
            if (resultsValidaHabitacion.length < 1 ) {
                res.send({mensaje: "La habitación seleccionada esta ocupada"})
            } else {
                //guarda el id de la habitacion
                idHabitacion = resultsValidaHabitacion[0]._id                 
                //Guarda la reserva                
                const results = await Reserva.create({cliente: idCliente, habitacion: idHabitacion, fechaCheckIn: now(), fechaCheckOut:""})        
                res.send({mensaje: "Nueva reserva creada", results})
            }
        }        
    } catch (error) {
        res.send({mensaje: "No ha sido posible añadir la reserva", error})
    }
})

//Registra el checkOut de la salida del cliente y libera la habitacion
router.put('/checkOut/:dni', async(req, res) => {
    let idCliente = ""
    try {
        const resultsValidaCliente = await Cliente.find({dni: req.params.dni})        
        if (resultsValidaCliente.length < 1)
            res.send({mensaje: "El cliente no existe, favor registrarlo."})                
        else {
            console.log("Cliente: ", resultsValidaCliente[0]._id)
            //guarda el id del cliente
            idCliente = resultsValidaCliente[0]._id                             
            //Actualiza la reserva                
            const results = await Reserva.findOneAndUpdate({cliente: idCliente, fechaCheckOut: null}, {fechaCheckOut: now()})        
            res.send({mensaje: "Reserva actualizada", results})
        }        
    } catch (error) {
        res.send({mensaje: "No ha sido posible actualizar la reserva para el checkOut", error})    
    }
})

module.exports = router