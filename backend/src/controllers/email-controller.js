import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

class EmailController {
    static async sendEmail(req, res) {

        const dataEmail = req.body;

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS_EMAIL
            }
        });

        try {
            const info = await transporter.sendMail({
                from: process.env.EMAIL,
                to: "testeucsprojetotematico3@gmail.com",
                subject: "CADASTRO DO SEU ECOPONTO FOI ACEITO!",
                html: `
                    <h1>Cadastro de Ecoponto</h1>
                    <p>Seu ecoponto foi cadastrado com sucesso! Para realizar login no site utilize as seguintes credenciais:</p>
                    <p><strong>Email:</strong> ${dataEmail.email}</p>
                    <p><strong>Senha:</strong> ${dataEmail.password}</p>
                `
            });

            res.status(201).json({message: info});
        } catch(err){
            res.status(500).json(err);
        }
    }
}

export default EmailController;