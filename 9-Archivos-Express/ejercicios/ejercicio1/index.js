const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const fileUpload = require('express-fileupload')
const fs = require('fs')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(fileUpload({createParentPath:true, safeFileNames: true, preserveExtension: true}))
app.use(express.static('public'))
app.use('/fotos', express.static('archivos'))

//Subir archivo
app.post ('/upload', (req, res) => {
    console.log("Archivo1: " + req.files)
    if (!req.files) {
        res.send({mesage: "No hay archivo para subir"})       
    } else {
        
        const file = req.files.archivo
        console.log("Archivo: " + file)
        const md5 = file.md5
        file.mv('./archivos/' + md5+file.name)
        
        res.send ({message: 'Archivo subido', 
                   status:true,
                   data: {name: file.name, mimetype:file.mimetype, size: file.size}
                })
    }
})

//Descarga de archivo
app.get('/download/:archivo', (req, res) => {
    res.download('./archivos' + req.params.archivo)

})

//Mostrar imagenes
app.get('/showImages', (req, res)=>{
    fs.readdir('./archivos', (err, files)=>{
        if(err){
            res.send({mensaje:"No se ha podido leer el directorio"})
        }else{
            const imgPaths = files.map((archivo)=> {
                return {'http://localhost:3000/fotos/'+archivo}
            })
            res.send({mensaje: "Archivos recuperados: ", results: imgPaths})
        }
    })
})


app.listen(PORT, (e) => {
    e
        ? console.error("🔴 Express no conectado")
        : console.log("🟢 Express conectado y a la escucha en el puerto: " + PORT)
})