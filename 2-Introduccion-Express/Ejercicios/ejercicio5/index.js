/* 5. Define un objeto con las siguientes propiedades: nombre, apellidos y edad. El objeto estará fuera de las rutas
para que sea accesible por todas ellas. Crea una aplicación en la que se pueda modificar cualquiera de las
propiedades de ese objeto utilizando peticiones de tipo get. Crea una ruta para cambiar el nombre, otra ruta
para el apellido y otra ruta para la edad. */

const express = require('express');
const app = express();

const persona =  {
    nombre: "Ana", 
    apellidos: "Rodriguez", 
    edad: 65
} 

app.get('/persona/:nombre', function(req, res) {
    if (!isNaN(req.params.nombre) || req.params.nombre.length<= 0)  {
        res.send("Favor indicar un nombre");
    } else {
        persona.nombre=req.params.nombre
        res.send(persona);
    }
        
})

app.get('/persona2/:apellidos', function(req, res) {
    if (!isNaN(req.params.apellidos) || req.params.apellidos.length<= 0)  {
        res.send("Favor indicar los apellidos");
    } else {
        persona.apellidos=req.params.apellidos
        res.send(persona);
    }
})

app.get('/persona3/:edad', function(req, res) {
    if (isNaN(req.params.edad))  
        res.send("Favor indicar la edad");     
    else {
        persona.edad=req.params.edad
        res.send(persona);
    }        
})

app.listen(process.env.PORT || 3000, (e) => {
    e
    ? console.error("El servidor no responde")
    : console.log("Conexión correcta con el servidor: " + (process.env.PORT || 3000))
});