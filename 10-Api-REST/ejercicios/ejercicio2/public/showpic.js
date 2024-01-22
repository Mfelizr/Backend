console.log
function getInfo() {
    const id = document.querySelector("#idcharacter")
    let msg = document.querySelector("#msg")
    console.log("El ID >> ", id.value)
    if (!id.value || id.value > 500) msg.textContent = "Debe indicar un id entre 0 y 500"
    else {
        msg.textContent = ""
        fetch(`https://api.disneyapi.dev/character/${id.value}`).then((res) => res.json()).then((data) => {
            console.log(data.data)            
            document.querySelector("#name").textContent = data.data.name
            document.querySelector("#id").textContent = data.data._id
            document.querySelector("#img").src = data.data.imageUrl
        })    
    
    }
}
