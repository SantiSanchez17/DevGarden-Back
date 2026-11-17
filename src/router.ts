import { Router } from 'express';
import { createUser, login } from './handlers/userH';
import { body } from 'express-validator'
import { handleInputErrors } from './middleware/validation';
const router = Router()

router.post('/auth/registro',
    body(['name', 'handle', 'email', 'password'])
        .notEmpty()
        .withMessage('Hay campos vacios'),
    body('email')
        .isEmail()
        .withMessage('Formato de correo invalido'),
    handleInputErrors,
    createUser
)

router.post('/auth/login',
    body(['email', 'password'])
        .notEmpty()
        .withMessage('Hay campos vacios'),
    body('email')
        .isEmail()
        .withMessage('Formato de correo invalido'),
    handleInputErrors,
    login,
)

export default router