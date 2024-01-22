/*8. Con los dos módulos del ejercicio anterior, crea una aplicación en la que hacer peticiones de tipo get a la que le
añadas /borrar/:numero para borrar el número (ponerlo a cero) del índice pasado por parámetro indicado (si
es que existe). */

const express = require('express');
const arrNumeros = require('./arrNumeros');
const randomNum = require('./modulo');

const app = express();

app.get('/random', function(req, res) {
    let i = randomNum()

    arrNumeros[i] += 1;

    res.send(arrNumeros);
})

app.get('/borrar/:numero', function(req, res) {
    
    let i = req.params.numero;
    if (req.params.numero < arrNumeros.length) {
        arrNumeros[i] = 0;
        res.send(arrNumeros);
    }else    
        res.send("Número no es valido. Indique un número de 0 a 9")    
})

app.listen(process.env.PORT || 3000, (e) => {
    e
    ? console.error("El servidor no responde")
    : console.log("Conexión correcta con el servidor: " + (process.env.PORT || 3000))
});