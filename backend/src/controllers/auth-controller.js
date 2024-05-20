import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

export const verifyAuth = async (req, res) => {
    const {email, password} = req.body;

    if(!email){
        return res.status(422).json({ message: 'O email é obrigatório'});
    }

    if(!password){
        return res.status(422).json({ message: 'A senha é obrigatória'});
    }

    const user = await User.findOne({ email: email });

    if(!user) {
        return res.status(404).json({ message: 'Usuário não encontrado'});
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if(!checkPassword){
        return res.status(422).json({ message: 'Senha inválida'});
    }

    try {

        const secret = process.env.SECRET
        const expiresIn = '1h'; /* tempo de expiração de 1 hora */

        const payload = {
            id: user._id,
            role: user.role
        }

        const token = jwt.sign(
            payload, 
            secret, 
            {expiresIn}
        );

        res.status(200).json({message: 'Autenticação realizada com sucesso', token});
    } catch(error){
        res.status(500).json({message: 'Aconteceu um erro no servidor'});
    }
} 

export const isAdmin = async(req, res) => {
    const token = req.body.token;

    const decodedToken = jwt.decode(token);

    if(decodedToken){
        const role = decodedToken.role;

        if(role === "admin"){
            return res.status(200).json({isAdmin: true});
        }
        return res.status(401).json({isAdmin: false});
    }
    return res.status(500).json({isAdmin: false});
}