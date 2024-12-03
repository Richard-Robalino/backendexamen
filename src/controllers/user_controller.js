import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import userModel from '../models/user.js';
import { createToken } from '../middlewares/auth.js';
const saltRounds = 10;

// Creamos la función
const registerUserController = async (req, res) => {
    const { password, ...otherDataUser } = req.body; // Desestructuramos toda la información que viene, el password (que va a ser encriptado) y la otra información
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Encriptamos el password, con el número de ciclos que se usará para la encriptación
    const userData = {
        id: uuidv4(), // Generamos un ID único para el usuario
        ...otherDataUser, // El resto de la información que se va a almacenar en la base de datos
        password: hashedPassword, // El password encriptado
    };
    try {
        const user = await userModel.registerUserModel(userData); // Registramos al usuario en la base de datos
        res.status(201).json(user); // Devolvemos la respuesta con el usuario creado
    } catch (error) {
        res.status(500).json(error); // Si ocurre un error, devolvemos el error
    }
}
const loginUserController = async (req, res) => {
    const { Username, password } = req.body;
    try {
        const user = await userModel.loginUserModel({ Username, password }); 
        const token = createToken(user);
        // Buscamos al usuario en la base de datos
        res.status(200).json({ user, token });

    } catch (error) {
        res.status(500).json(error);
    }
}

export {
    registerUserController,
    loginUserController
};
