const express = require('express');
const app = express();

let animales = [
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
    res.send(listaAnimales(animales,"Lista de Animales"))
})

app.get('/adoptar', function(req, res) {
    animales = animales.filter ((animal) => animal.nombre != req.query.nombre)
    res.send(listaAnimales(animales,"Animal Adoptado"))
})

function listaAnimales (animales, titulo) {
    let datos = ""    
    animales.forEach((animal) => 
        datos += `<tr>
                    <td>${animal.nombre}</td>
                    <td>${animal.tipo}</td>
                    <td>${animal.edad}</td>
                    <td><form action="/adoptar">
                            <input type="text" name="nombre" id="nombre" value="${animal.nombre}" hidden>
                            <button type="submit">Adoptar</button>
                        </form>
                    </td>
                   </tr>`)
    return `<h1>${titulo}</h1>
    <table>
        <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Edad</th>
        </tr>
        ${datos}
    </table>`
}


app.listen(process.env.PORT || 3000, (e) => {
    e
    ? console.error("El servidor no responde")
    : console.log("Conexión correcta con el servidor: " + (process.env.PORT || 3000))
});