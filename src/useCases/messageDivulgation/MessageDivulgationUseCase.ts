import { prisma } from "../../database";
import { LawyerNotFoundError } from "../../errors";
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
        const { fk_lawyer, fk_divulgation, message } = reviewRequest;
        let fk_client = 0;
        let email_client = "";

        if (NonEmptyString.validate("fk_lawyer",fk_lawyer) ) {
            throw new LawyerNotFoundError()
        }

        if (NonEmptyString.validate("fk_divulgation",fk_divulgation) ) {
            throw new DivulgationNotFoundError()
        }

        const lawyer = await prisma.advogado.findUnique({
            where: {
                id_advogado: Number(fk_lawyer),
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

        const divulgacao = await prisma.divulgacao.findUnique({
            where: {
                id_divulgacao: Number.parseInt(fk_divulgation)
            },
            include: {
                cliente: {
                    select: {
                        id_cliente: true,
                        usuario: {
                            select: {
                                email: true
                            }
                        }
                    }
                }
            }
        });

        if (divulgacao) {
            fk_client = divulgacao.cliente.id_cliente;
            email_client = divulgacao.cliente.usuario?.email || "";
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
        
        mail.sendEmail({
            from: process.env.SMTP_AUTH_USER ?? "",
            html: `<p>Olá, o advogado abaixo encaminhou uma mensagem referente à divulgação em aberto:!<br> </p>
            <p><b>Nome:</b> ${lawyer?.nome}}</p>
            <p><b>Nota:</b> ${lawyer?.nota}</p>
            <p><b>E-mail:</b> ${lawyer?.usuario?.email}</p>
            <p><b>Telefone:</b> ${lawyer?.tel_celular != "" ? lawyer?.tel_celular : "Não informado"}</p>
            <p><b>Mensagem:</b> ${message}</p>
            <p><b>Cidade:</b> ${lawyer?.endereco?.cidade}</p>
            <p><b>Estado:</b> ${lawyer?.endereco?.estado}</p>
            <p><b>Caso seja do seu interesse entre em contato com o mesmo através dos contatos informado ou agende uma conversa direto pelo site!</b></p>
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