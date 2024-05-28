import { user } from "../models/User.js";
import bcrypt from "bcrypt";

/* Gera uma senha aleatoria */
const generateRandomPassword = (length = 8) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    return password;
};

class UserController {
    static async generateUser(req, res) {
        try {

            const { email } = req.body;

            const existingUser = await user.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email já está em uso' });
            }

            const plainPassword = generateRandomPassword();

            const password = plainPassword;

            const hashedPassword = await bcrypt.hash(plainPassword, 10); // criptografar a senha

            const newUser = new user({
                email,
                password: hashedPassword,
                role: 'ecopointer'
            });

            await newUser.save();

            res.status(201).json({ message: 'Usuário criado com sucesso', user: { email, password: password, role: newUser.role } });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
        }
    }
}

export default UserController;