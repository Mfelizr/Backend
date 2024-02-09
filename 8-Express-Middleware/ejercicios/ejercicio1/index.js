const express = require('express');
const app = express();
const {MongoClient} = require('mongodb')
const PORT = process.env.PORT || 3000;
const cors = require('cors')
const bcrypt = require('bcrypt');

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Configurar opciones de CORS e instanciarlas en el middleware
const corsOptions = {
    origin: "http://www.midominio.es",
    methods: "GET, POST, PUT, DELETE"
}
app.use(cors(corsOptions))

//Mostrar IP en todas las rutas de peticiones
app.use(showIP)

const client = new MongoClient('mongodb://127.0.0.1:27017')

async function connectMongo() {
    try {
        await client.connect().then((client) => app.locals.db = client.db('mongodb_express'))
        console.log('🟢 MongoDB conectado')
    } catch (error) {
        console.error('🔴 MongoDB no conectado')
    }
}

connectMongo()


// Busca USUARIOS
app.get('/api/usuarios', async (req, res) => {    
    try {
        const results = await app.locals.db.collection('usuarios').find().toArray()
        res.send({mensaje: "Realizada la petición correctamente", results})
    } catch (error) {
        res.send({mensaje: "Error en la petición", error})
    }
})

// Añadir usuario
app.post('/api/nuevoUsuario', async (req, res) => {    
    try {
        const {usuario, password} = req.body
        const passEncripted = bcrypt.hashSync(password, 12);
        console.log("DATOS:", req.body, passEncripted)
        const results = await app.locals.db.collection('usuarios').insertOne({usuario:usuario, password:passEncripted})
        res.send({mensaje: "El usuario se ha insertado correctamente.", results})
    } catch (error) {
        res.send({mensaje: "No se ha insertado el usuario.", error})
    }
})

// Actualizar usuario
app.put('/api/editarUsuario/:id', async (req, res) => {    
    try {

        let newPassword = bcrypt.hashSync(req.body.password, 12)
        const results = await app.locals.db.collection('usuarios').updateOne({usuario: req.params.id}, {$set: {password: newPassword}})
        res.send({mensaje: "Los usuarios se ha actualizado correctamente.", results})
    } catch (error) {
        res.send({mensaje: "No se ha actualizado ningun usuario.", error})
    }
})

// Borrar usuario
app.delete('/api/borrarUsuario/:id', async (req, res) => {    
    try {        
        const results = await app.locals.db.collection('usuarios').deleteOne({usuario: req.params.id})
        res.send({mensaje: "Los usuarios se han eliminado correctamente.", results})
    } catch (error) {
        res.send({mensaje: "No se ha eliminado ningun usuario.", error})
    }
})

// Comprobar Credenciales
app.post('/api/login', async (req, res) => {        
    try {
        const {usuario, password} = req.body
        const passEncripted = bcrypt.hashSync(password, 12);
        console.log("DATOS:", req.body, passEncripted)
        const results = await app.locals.db.collection('usuarios').find({usuario: usuario}).toArray()        
        if (results.length>0) {
            bcrypt.compareSync(password, results[0].password)
            ?res.send({mensaje: "Login correcto"})
            :res.send({mensaje: "Credenciales incorrectas"})
        }else{
            res.send({mensaje: "Credenciales no existen"})
        }        
    } catch (error) {
        res.send({mensaje: "Error autenticando credenciales", error})
    }
})

//Funcion para mostrar IP
function showIP(req, res, next){
    const ip = req.ip;
    console.log("La IP y ruta actual son: ", ip,  req.originalUrl);
    next()
}

app.listen(PORT, (e) => {
    e
        ? console.error("🔴 Express no conectado")
        : console.log("🟢 Express conectado y a la escucha en el puerto: " + PORT)
})