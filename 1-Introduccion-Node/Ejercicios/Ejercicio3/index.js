/* 3. Escribe un módulo con una función que al recibir un string nos devuelva el número de caracteres que tiene.
Después impórtalo en tu “entry point” y utilízala para devolver la longitud de “En un lugar de la mancha de cuyo
nombre no quiero acordarme” */
//1-importar
const numChar = require ('./modulo')

const frase = "En un lugar de la mancha de cuyo nombre no quiero acordarme"

console.log(`El número de caracteres para la frase: "${frase}" es: ${numChar(frase)}`)
