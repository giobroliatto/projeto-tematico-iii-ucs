import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();


// Além de verificar a existência de um token, verifica se o usuário é o administrador
export function checkAdminToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(410).json({ message: "Acesso negado" });
    }

    try {
        const secret = process.env.SECRET;
        const decoded = jwt.verify(token, secret);

        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: "Acesso negado: você não possui permissões de administrador" });
        }

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(400).json({ message: 'Token inválido', error});
    }
}

// Verifica a existência do token
export function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        return res.status(410).json({ message: `${"Acesso negado"}`});
    }

    try {
        const secret = process.env.SECRET

        jwt.verify(token, secret)

        next()
    } catch(error){
        return res.status(400).json({ message: 'Token inválido'});
    }
}