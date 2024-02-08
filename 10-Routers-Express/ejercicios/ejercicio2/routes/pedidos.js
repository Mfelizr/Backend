const express = require('express')
const router = express.Router()


// 1- Buscar Menus
router.get('/show', async(req, res) =>{
    try {
        const results = await app.locals.db.collection('pedidos').find().toArray()
        res.send({mensaje: 'Consulta realizada', results})
    } catch (error) {
        res.send({mensaje: 'Error en la consulta', error})        
    }
})

router.post('/add', async(req, res) => {
    res.send({mensaje:"Pedido agregado"})
})

router.put('/edit', async(req, res) => {
    res.send({mensaje:"Pedido modificado"})
})

module.exports = router