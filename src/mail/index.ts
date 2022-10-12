import * as nodemailer from "nodemailer";
import { DomainError } from "../errors/domain-error";

interface IMailOptions {
    from: string;
    to: string;
    subject: string;
    html: string;
    attachments?: any;
}

class SendMailError extends DomainError {
    constructor (message: string) {
        super(`Não foi possível fazer o envio do e-mail. Erro: ${message}`)
    }
}

class Mail {
    async  sendEmail(mailOptions : IMailOptions) {
        let transporter = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            host: process.env.SMTP_HOST,
            port: Number.parseInt(process.env.SMTP_PORT ?? ""),
            secure: false,
            auth: {
                user: process.env.SMTP_AUTH_USER,
                pass: process.env.SMTP_AUTH_PASSWORD
            },
            tls: { rejectUnauthorized: false }
        });

        
        await transporter.sendMail(mailOptions).catch((error) => {
            throw new Error(error.message);
        });

        transporter.close(); // fechando a conexão com o servidor de e-mail
    }
}


const mail = new Mail();

export { mail }