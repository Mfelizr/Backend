const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const {Cliente} = require('./schemas')


//Registramos un nuevo cliente verificando previamente que no exista
router.post('/add', async(req, res)=>{
    try {
        console.log(req.body)                   
        const resultsExiste = await Cliente.find({dni: req.body.dni})        
        if (resultsExiste.length > 0)
            res.send({mensaje: "El cliente ya existe previamente, favor verificar."})                
        else {
            const {nombre, apellido, dni} = req.body
            const results = await Cliente.create({nombre, apellido, dni})        
            res.send({mensaje: "Nuevo cliente añadido", results})
        }        
    } catch (error) {
        res.send({mensaje: "No ha sido posible añadir cliente", error})
    }
})
//Editar cliente
router.put('/edit/:id', async(req, res) => {    
    try {
        const {nombre, apellido} = req.body
        const results = await Cliente.findByIdAndUpdate(req.params.id, {nombre: nombre, apellido: apellido})        
        res.send({mensaje: "Cliente actualizado", results})        
    } catch (error) {
        res.send({mensaje: "No ha sido posible actualizar los datos del cliente", error})
        
    }
})

//Verifica si el cliente existe
router.get('/findCliente/:dni', async(req, res) => {
    try {
        if (req.params.dni) {
            const results = await Cliente.find({dni: req.params.dni})
            results.length > 0
            ?res.send({mensaje: "Cliente existe", results})   
            :res.send({mensaje: "Cliente no está registrado"})   
        } else {
            res.send({mensaje: "Favor especificar un DNI Valido", results})   
        }
    } catch (error) {
        res.send({mensaje: "Error buscando los datos del cliente", error})
    }
})

module.exports = router


