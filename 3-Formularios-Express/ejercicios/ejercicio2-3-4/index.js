/* 2. Crear una segunda ruta /sumar-animal que recibirá por query el nombre, el tipo y la edad de un animal. Al
recibirlo, se creará un objeto de animal con su información y se añadirá a la lista de animales en el servidor.
3. Si no habéis creado un formulario para enviar la información a la ruta /sumar-animal crear una tercera ruta
/dejar-animal en la que mostraremos un formulario en el que el usuario de la página puede introducir el
nombre, el tipo y la edad de un animal. Cuando se haga click en el botón del formulario, se enviará la
información introducida a la ruta /sumar-animal . Si ya habéis creado el formulario, no hace falta este paso.
 */
const express = require('express');
const app = express();
app.use(express.static('public'));

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
app.get('/sumar-animal', function(req, res) {
    let {nombre,tipo,edad} = req.query
    edad = parseInt(edad)
    animales.push({nombre,tipo,edad})
    res.send(`Se ha añadido un nuevo animal ${nombre}`);
})

app.get('/adoptar', function(req, res) {
    animales = animales.filter ((animal) => animal.nombre != req.query.nombre)
    res.send(`Se ha adoptado un nuevo animal ${req.query.nombre}. Nueva lista: ${animales}`)
})

app.listen(process.env.PORT || 3000, (e) => {
    e
    ? console.error("El servidor no responde")
    : console.log("Conexión correcta con el servidor: " + (process.env.PORT || 3000))
});