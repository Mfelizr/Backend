/* 7. Crea un módulo propio con un array de 10 ceros. Crea otro módulo con una función que devuelva un número
aleatorio entre 0 y 9. Crea una ruta para que cada vez que se haga una petición de tipo get, se llame al método
de número aleatorio y se sume 1 al valor del número en el índice del número aleatorio. Muestra el array con los
valores en la respuesta. */

const express = require('express');
const arrNumeros = require('./arrNumeros');
const randomNum = require('./modulo');

const app = express();

app.get('/random', function(req, res) {
    let i = randomNum()

    arrNumeros[i] += 1;

    res.send(arrNumeros);
})

app.listen(process.env.PORT || 3000, (e) => {
    e
    ? console.error("El servidor no responde")
    : console.log("Conexión correcta con el servidor: " + (process.env.PORT || 3000))
});