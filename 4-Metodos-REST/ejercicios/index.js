/* 1. Crea un array de personas. Cada objeto “persona” tendrá nombre, apellido y edad. Crea una página HTML que
haga un fetch al servidor. En el servidor crea una ruta que reciba una petición GET que devuelve el array de
personas. Muestra el contenido del array en el HTML. */
const personas = require('./personas')
const express = require('express')
const app = express()
app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(express.static('public'))

app.get('/persona1', function(req, res) {
    let datos = ""
    console.log(personas)
    personas.forEach((personas, i) => datos += `<p>Nombre: ${personas.nombre}, Edad: ${personas.edad}, Apellidos: ${personas.apellido}</p>`)
    res.send(`<h1>Lista de personas</h1><div>${datos}</div>`);    
});
/* 2. Crea una ruta POST que reciba una petición con un objeto persona con nombre, apellido y edad. Añade ese
objeto al array de personas. */
app.post('/persona2', function(req, res) {
    const persona = 
        {nombre: req.body.nombre, 
         apellido: req.body.apellido, 
         edad: req.body.edad}
    personas.push(persona)

    res.send(`Agregado: ${persona}`);
});

/* 3. Crea una ruta PUT que reciba un objeto persona con nombre, apellido y edad. Dentro del array personas,
modifica el objeto que tenga el nombre que recibimos en la petición. */
app.put('/persona3', function(req, res) {
    let respuesta ="No se ha actualizado ningun dato"
    const i = personas.findIndex((persona) => persona.nombre === req.body.nombre)
    if (i >= 0) {                
        if (req.body.apellido.length>0) personas[i].apellido=req.body.apellido
        if (req.body.edad>0) personas[i].edad=req.body.edad
        respuesta=`Actualizado los datos para ${persona[i].nombre}`
    }     
    res.send(respuesta);
});

/* 4. Crea una ruta DELETE que reciba un nombre de persona. Borra el objeto persona del array que tenga el
nombre que recibimos en la petición. */
app.delete('/persona4', function(req, res) {
    let respuesta ="No se ha eliminado ningun dato"
    const i = personas.findIndex((persona) => persona.nombre === req.body.nombre)
    if (i >= 0) {        
        const personaEliminada = personas[i].nombre
        personas.splice(i,1)
        respuesta=`Eliminado los datos para ${personaEliminada}`
    }     
    res.send(respuesta);
});

app.listen(process.env.PORT || 3000, (e) => {
    e
    ? console.error("El servidor no responde")
    : console.log("Conexión correcta con el servidor: " + (process.env.PORT || 3000))
});