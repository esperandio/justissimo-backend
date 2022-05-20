import * as nodemailer from "nodemailer";
import { DomainError } from "../errors";

interface IMailOptions {
    from: string;
    to: string;
    subject: string;
    html: string;
}

class SendMailError extends DomainError {
    constructor (message: string) {
        super(`Não foi possível fazer o envio do e-mail. Erro: ${message}`)
    }
}

class Mail {
    sendEmail(mailOptions : IMailOptions) {
        const transporter = nodemailer.createTransport({
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


        transporter.sendMail(mailOptions, function (error) {
            if (error) {
                throw new SendMailError(error.message);
            }
        });
    }
}

const mail = new Mail();

export { mail }