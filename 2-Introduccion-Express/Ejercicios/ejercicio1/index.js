const express = require('express');
const app = express();

app.get('/', function(request, response) {
    response.send('<h1>Hola Mundo</h1> <h2>Desde Express</h2>')
})

app.listen(3000);