/* 6. Declara un array con los nombres de l@s estudiantes del curso. Crea una aplicación en la que se puedan añadir
elementos a ese array mediante el método get. Entonces agrega los nombres de los profesores. */
const express = require('express');
const app = express();

const estudiantes = ["Mildry","Maria","Ester","Carlos","Victor","Marina","Jose","Antonio","Kevin","Gloria","Alexander","Nuria"]

app.get('/add/:profesor', function(req, res) {
    
    if (!isNaN(req.params.profesor) || req.params.profesor.length <= 0)  {
        res.send("Favor indicar el nombre");
    } else {
        estudiantes.push(req.params.profesor)
        res.send(estudiantes);
    }    
})

app.listen(process.env.PORT || 3000, (e) => {
    e
    ? console.error("El servidor no responde")
    : console.log("Conexión correcta con el servidor: " + (process.env.PORT || 3000))
});