const express = require('express')
const salonRouter = require('./routes/salon')
const usuariosRouter = require('./routes/usuarios')
const cors = require("cors")

class Server {
    constructor(){
        this.app = express();
        this.PORT = process.env.PORT
        this.paths = {
            salon:"/api/v1/eventos ",
            usuarios:"/api/v1/usuarios"
        }
        this.middlewares()
        this.routes()
    }
    routes() {
    this.app.use(this.paths.salon, salonRouter)
    this.app.use(this.paths.usuarios, usuariosRouter)
    }
middlewares(){
this.app.use(cors()) //permite solicitudes de origen cruzado
this.app.use(express.json())//habilita la lectura de contenido en formato JSON
}
    listen(){
        this.app.listen(this.PORT, () => {
            console.log('servidor corriendo en el puerto ', this.PORT);
        
        })
    }
}
module.exports = Server