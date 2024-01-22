const objeto = require ('./modulo')

const listaPaises = objeto.paises.a.concat(objeto.paises.b, objeto.paises.c)
const paisesFavoritos = listaPaises.filter((pais, i) => objeto.favoritos.includes(i))
console.log(listaPaises)   
console.log ("Los paises favoritos de ", objeto.nombre, " son: ", paisesFavoritos)

