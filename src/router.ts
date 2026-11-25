import { Router } from 'express';
import { createUser, getUser, login } from './handlers/userH';
import { body } from 'express-validator'
import { handleInputErrors } from './middleware/validation';
import { authenticate } from './middleware/auth';
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

router.get('/user', authenticate, getUser)

export default router