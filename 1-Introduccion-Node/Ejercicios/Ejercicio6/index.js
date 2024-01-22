const calcFactorial = require('./funciones/modulo')
let supervillains = require("supervillains")

for (let i = 1; i <= 4; i++) {
    const randomNum = Math.floor(Math.random()*5)+1    
    console.log(`Supervillano random: ${i} - ${supervillains.all[calcFactorial(randomNum)]}`)
}
