/* 2. Crea una aplicación con una ruta a la que le puede llegar un parámetro en la url. Al hacer una petición get a esa
ruta, el servidor devolverá como respuesta un número aleatorio entre 1 y el número que llega como parámetro.
 */
const express = require('express');
const app = express();

app.get('/:num', function(request, response) {
    const num = request.params.num;
    if (isNaN(num)) {response.send('Debe introducir un valor númerico')}
    else {        
        response.send(randomNum(num).toString());
    }
})

function randomNum(num) {
    return Math.floor(Math.random()*num)+1;
}

app.listen(3000);