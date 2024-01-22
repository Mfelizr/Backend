/* 3. Crea un array de 5 nombres. Define dos rutas: una será del tipo “/persona” y la otra será /persona/:parámetro .
Al entrar a la primera ruta nos devolverá la lista de personas y al entrar a la segunda nos devolverá la persona solicitada.*/

const express = require('express');
const app = express();
const personas=["Mildry","Roberto","Ali","Isa","Juan"];

app.get('/persona', function(request, response) {
    response.send(personas.join());
});

app.get('/persona/:nombre', function(request, response) {
    const nombre = request.params.nombre;    
    //Hacer un find del parametro en el array y con el indice tomar el nombre desde el array
    const i = personas.findIndex((persona) => persona === nombre)
    response.send('Hola ' + personas[i]);
});

app.listen(3000);