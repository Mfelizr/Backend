/* 4. Crea una aplicación express con un index.js y un archivo .js aparte en el que tendrás una función
saludarEnExpress() que devuelva un string. Importa este módulo en el index.js y crea una ruta para que cada
vez que se haga una petición get a esa ruta, se muestre el string que nos devuelve la función. */
const express = require('express');
const saludo = require('./saludo')
const app = express();

app.get('/saludo', function(req, res) {

    res.send(saludo());
})

app.listen(process.env.PORT || 3000, (e) => {
    e
    ? console.error("El servidor no responde")
    : console.log("Conexión correcta con el servidor: " + (process.env.PORT || 3000))
});