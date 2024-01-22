fetch('/persona1').then((res) => res.json()).then((data)=>{
    console.log(data)
    data.forEach((persona, i) => {
    document.querySelector("#contentPersonas").innerHTML += `<p>Nombre: ${persona.nombre}, Apellidos: ${persona.apellido}, Edad: ${persona.edad}</p>`
    })
}) 


