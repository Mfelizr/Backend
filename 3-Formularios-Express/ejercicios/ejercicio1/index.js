/* 1. Crear una aplicación de servidor que tenga una lista de animales (un array con objetos) que tendrán nombre,
edad y tipo de animal. Cuando vayamos a la raíz (ruta '/’) el servidor devolverá el HTML de la lista de animales. */
const express = require('express');
const app = express();

const animales = [
    {
        nombre: "Bengi",
        edad: 2,
        tipo: "perro"
    },
    {
        nombre: "Fluffy",
        edad: 2,
        tipo: "gato"
    },
    {
        nombre: "Cony",
        edad: 1,
        tipo: "conejo"
    },
]
app.get('/', function(req, res) {
    let datos = ""
    console.log(animales)
    animales.forEach((animal, i) => datos += `<p>Nombre: ${animal.nombre}, Edad: ${animal.edad}, Tipo de Animal: ${animal.tipo}</p>`)
    res.send(`<h1>Lista de animales</h1><div>${datos}</div>`);
})

app.listen(process.env.PORT || 3000, (e) => {
    e
    ? console.error("El servidor no responde")
    : console.log("Conexión correcta con el servidor: " + (process.env.PORT || 3000))
});