import {Router} from 'express'
import { loginUserController, registerUserController } from '../controllers/user_controller.js'

const router = Router()
//Rutas privadas
router.post('/users/register',registerUserController)

router.post('/users/login',loginUserController)

export default router