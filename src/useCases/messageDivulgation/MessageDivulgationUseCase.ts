import { prisma } from "../../database";
import { DomainError, LawyerNotFoundError } from "../../errors";
import { DivulgationNotFoundError } from "../../errors/divulgation-not-found-error";
import { mail } from "../../mail";
import { NonEmptyString } from "../../validators";

interface IMessageDivulgationRequest {
    fk_lawyer: string;
    fk_divulgation: string;
    message: string;
}

class MessageDivulgationUseCase {
    async execute(reviewRequest: IMessageDivulgationRequest): Promise<void> {
        const fk_lawyer = NonEmptyString.validate("fk_lawyer", reviewRequest.fk_lawyer).value;
        const fk_divulgation = NonEmptyString.validate("fk_divulgation", reviewRequest.fk_divulgation).value;
        const message = NonEmptyString.validate("message", reviewRequest.message).value;

        let fk_client = 0;
        let email_client = "";
        let name_client = "";

        if (message.length > 200) {
            throw new DomainError("Mensagem muito grande, máximo de 200 caracteres!");
        }

        const lawyer = await prisma.advogado.findUnique({
            where: {
                id_advogado: Number.parseInt(fk_lawyer),
            },
            include: {
                usuario: {
                    select: {
                        email: true,
                    }
                },
                endereco: {
                    select: {
                        cidade: true,
                        estado: true,
                    }
                }
            }
        });
        if (!lawyer) {
            throw new LawyerNotFoundError()
        }

        const divulgacao = await prisma.divulgacao.findUnique({
            where: {
                id_divulgacao: Number.parseInt(fk_divulgation)
            },
            include: {
                cliente: {
                    select: {
                        id_cliente: true,
                        nome: true,
                        usuario: {
                            select: {
                                email: true
                            }
                        }
                    }
                }
            }
        });

        if (!divulgacao) {
            throw new DivulgationNotFoundError()
        }
        else {
            fk_client = divulgacao.cliente.id_cliente;
            email_client = divulgacao.cliente.usuario?.email || "";
            name_client = divulgacao.cliente.nome || "";
        }

        await prisma.mensagemDivulgacao.create({
            data: {
                fk_advogado: Number.parseInt(fk_lawyer),
                fk_divulgacao: Number.parseInt(fk_divulgation),
                mensagem: message,
                dt_mensagem: new Date(),
                fk_cliente: fk_client,
            },    
        });
        
        // pegar somente o primeiro nome do cliente
        const name = name_client.split(" ")[0];

        mail.sendEmail({
            from: process.env.SMTP_AUTH_USER ?? "",
            html: `<p>Olá ${name}, o advogado abaixo encaminhou uma mensagem referente a divulgação em aberto:<br> </p>
            <p><b>Nome:</b> ${lawyer?.nome}</p>
            <p><b>Nota:</b> ${lawyer?.nota != null ? lawyer?.nota : "Sem avaliações."}</p>
            <p><b>E-mail:</b> ${lawyer?.usuario?.email}</p>
            <p><b>Telefone:</b> ${lawyer?.tel_celular != "" ? lawyer?.tel_celular : "Não informado"}</p>
            <p><b>Mensagem:</b> ${message}</p>
            <p><b>Cidade:</b> ${lawyer?.endereco?.cidade}</p>
            <p><b>Estado:</b> ${lawyer?.endereco?.estado}</p>
            <p><b>Caso seja do seu interesse entre em contato com o mesmo através dos contatos informados acima ou agende uma conversa direto pelo site!</b></p>
            <p><b><a href="https://justissimo-frontend.herokuapp.com/">Clique aqui para acessar o Justíssimo</a></b></p>
            <p><b>Atenciosamente,<br> Equipe Justissimo</b></p>
            <img src="cid:justissimo_logo"}>`,
            subject: "Contato de advogado",
            to: email_client,
            attachments: [{
                filename: 'logo_justissimo.png',
                path: '././src/images/logo_justissimo.png',
                cid: 'justissimo_logo' //same cid value as in the html img src
            }]
        });
    }
}

export { MessageDivulgationUseCase }