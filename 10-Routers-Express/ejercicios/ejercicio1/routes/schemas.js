const mongoose = require('mongoose')

const clienteSchema = new mongoose.Schema({
    nombre: {
            type: String,
            required: [true, 'Favor indicar el nombre']     
    },
    apellido: {
        type: String,
        required: [true, 'Favor indicar el apellido']     
    },
    dni: {type: String, required: [true, 'Favor indicar el DNI']}    
})

const habitacionSchema = new mongoose.Schema({    
    numeroHabitacion: {
            type: Number,
            required: [true, 'Favor indicar el numero de habitación']     
    },
    libre: {
        type: Boolean,
        required: [true, 'Favor indicar el estado de la habitación']     
    }    
})

const reservaSchema = new mongoose.Schema({    
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cliente', 
        required: [true, "Favor indicar el cliente"]
    },
    habitacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'habitacion', 
        required: [true, "Favor indicar la habitación asignada"]
    },
    fechaCheckIn: Date,
    fechaCheckOut: Date
})


const Cliente = mongoose.model('cliente', clienteSchema)
const Habitacion = mongoose.model('habitacion', habitacionSchema)
const Reserva = mongoose.model('reserva', reservaSchema)

module.exports = {Cliente, Habitacion, Reserva}