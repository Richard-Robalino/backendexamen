import bcrypt from "bcrypt";
import dotenv from 'dotenv';

dotenv.config()
const userModel = {
    // Método de registro
    async registerUserModel(newUser) {
        const url = process.env.URL_BDD_USERS;
        const peticion = await fetch(url, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: { 'Content-Type': 'application/json' },
        }); // En las cabeceras se especifica el tipo de información que se enviará a la base de datos

        const data = await peticion.json(); // Se parsea la respuesta de la base de datos como JSON
        return data; // Se devuelve la información que el controlador necesita para manejarla
    },

    // Método de login
    async loginUserModel(loginUser) {
        const { Username, password } = loginUser; // Extraemos Username y password del objeto loginUser

        const url = process.env.URL_BDD_USERS; // URL correcta de donde obtener los usuarios
        const peticion = await fetch(url);
        const users = await peticion.json(); // Obtenemos todos los usuarios

        const user = users.find(user => user.Username === Username); // Buscamos el usuario que coincida con el Username

        if (!user) {
            return { error: "User not found" }; // Si no se encuentra el usuario
        }

        const passwordMatch = await bcrypt.compare(password, user.password); // Comparamos las contraseñas
        if (user &&passwordMatch) {
            return user; // Si las contraseñas coinciden, retornamos el usuario
        } else {
            return { error: "Incorrect password" }; // Si las contraseñas no coinciden
        }
    }
};

export default userModel;
