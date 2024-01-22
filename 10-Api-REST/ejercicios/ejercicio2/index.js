const express = require('express')
const app = express()
app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(express.static('public'))

/* app.get('/persona1', function(req, res) {
    let datos = ""
    console.log(personas)
    personas.forEach((personas, i) => datos += `<p>Nombre: ${personas.nombre}, Edad: ${personas.edad}, Apellidos: ${personas.apellido}</p>`)
    res.send(`<h1>Lista de personas</h1><div>${datos}</div>`);    
});
 */
app.listen(process.env.PORT || 3000, (e) => {
    e
    ? console.error("El servidor no responde")
    : console.log("Conexión correcta con el servidor: " + (process.env.PORT || 3000))
});