const mongoose = require('mongoose')

const discoSchema = new mongoose.Schema({    
    titulo: {type: String, required: [true, 'Favor indicar el título']},
    artista: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'artista', 
        required: [true, "Favor indicar el artista"]
    },
    anno: {type: Number, required: [true, 'Favor indicar el año del disco']},
    genero: String,
    stock: {type: String, required: [true, 'Favor indicar el stock']},
    formato: String    
})

const artistaSchema = new mongoose.Schema({    
    nombre: {
            type: String,
            required: [true, 'Favor indicar el nombre']     
    },
    genero: {type: String, required: [true, 'Favor indicar el genero']},
    fechaDeNacimiento: Date,
    nacionalidad: {
                    type: String,
                    required: [true, 'Favor indicar el nombre']     
    },
    nombreArtistico: String    
})

const Disco = mongoose.model('disco', discoSchema)
const Artista = mongoose.model('artista', artistaSchema)

module.exports = {Disco, Artista}