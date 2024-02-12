const express = require('express')
const router = express.Router()


// 1- Buscar Hamburguesas
router.get('/show', async(req, res) =>{
    try {
        const results = await req.app.locals.db.collection('productos').find({tipo:"hamburguesas"}).toArray()
        res.send({mensaje: 'Consulta realizada', results})
    } catch (error) {
        res.send({mensaje: 'Error en la consulta', error})        
    }
})


module.exports = router