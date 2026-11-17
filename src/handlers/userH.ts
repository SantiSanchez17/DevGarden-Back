import { Request, Response } from 'express'
import slug from 'slug'
import UserModel from "../models/User"
import { checkPassword, haspassword } from '../utils/auth'
import { validationResult } from 'express-validator'

export const createUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        if (await UserModel.findOne({ email })) return res.status(409).send('Ya hay un usuario con este correo');
        const user = new UserModel(req.body)

        const handle = slug(req.body.handle);
        if (await UserModel.findOne({ handle })) return res.status(409).send('Ya existe este handle');

        user.password = await haspassword(password);
        user.handle = handle;
        await user.save(req.body);

        if (!user) {
            res.status(201).send('No se pudo registrar el usuario');
        }
        res.send('Se registro el usuario correctamente');
    } catch (error) {
        console.log('Error', error);
        res.status(400).send('No se pudo registrar el usuario');
    }
}

export const login = async (req: Request, res: Response) => {
    console.log('login');
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })
        if (!user) return res.status(404).send('Este usuario no existe');

        if (!await checkPassword(password, user.password)) return res.status(409).send('contraseña equivocada, intente nuevamente');

        res.status(200).send('Sesion Iniciada')
    } catch (error) {
        console.log('Error', error);
        res.status(400).send('No se pudo registrar el usuario');
    }
}