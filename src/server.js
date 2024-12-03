// Requerir módulos 
import express from 'express'
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import routerGame from './routers/games_routes.js' // Cambié a 'games_routes'
import routerUser from './routers/user_routes.js'

// Inicializaciones
dotenv.config()
const app = express()

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}));
// Variables 
app.set('port', process.env.puertito || 3000)

// Middlewares
app.use(express.json())

// Rutas a
app.get('/', (req, res) => {
    res.send("Server on")
})

// Rutas Games
app.use('/api', routerGame)

// Rutas Usuarios
app.use('/api', routerUser)

// Manejo de una ruta que no sea encontrada
app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))
// Exportar la variable app 
export default app
