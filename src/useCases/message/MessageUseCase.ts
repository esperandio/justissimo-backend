import { prisma } from "../../database";
import { DomainError, LawyerNotFoundError, UserNotFoundError } from "../../errors";
import { mail } from "../../mail";
import { NonEmptyString } from "../../validators";
import { DateConvertedBr } from "../../validators/date-converted-br";

interface IMessageDivulgationRequest {
    id_user: string;
    fk_lawyer: string;
    message: string;
}

class MessageUseCase {
    async execute( messageRequest: IMessageDivulgationRequest) {
        const id_user = NonEmptyString.validate("id_user", messageRequest.id_user).value;
        const message = NonEmptyString.validate("message", messageRequest.message).value;
        const fk_lawyer = NonEmptyString.validate("fk_lawyer", messageRequest.fk_lawyer).value;

        if (message.length > 200) {
            throw new DomainError("Mensagem muito grande, máximo de 200 caracteres!");
        }

        const user = await prisma.usuario.findFirst({
            where: {
                id_usuario: Number.parseInt(id_user)
            },
            include: {
                cliente: {
                    select: {
                        id_cliente: true,
                        nome: true,
                        endereco: true,
                    },
                },
            }
        });

        if (!user) {
            throw new UserNotFoundError();
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
            }
        });

        if (!lawyer) {
            throw new LawyerNotFoundError()
        }
        
        if (!user.cliente) {
            throw new DomainError("Usuário não está cadastrado como um cliente!");
        }
        
        const messageCreate = prisma.mensagem.create({
            data: {
                mensagem: message,
                fk_cliente: user.cliente.id_cliente,
                fk_advogado: Number.parseInt(fk_lawyer),
                dt_mensagem: DateConvertedBr.validate(new Date().toLocaleString())
            }
        });
    
        try {
            await mail.sendEmail({
                from: process.env.SMTP_AUTH_USER ?? "",
                html: `<p>Olá, o usuário abaixo encaminhou uma mensagem para você:<br> </p>
                <p><b>Nome:</b> ${user.cliente.nome}</p>
                <p><b>E-mail:</b> ${user?.email}</p>
                <p><b>Cidade:</b> ${user.cliente.endereco?.cidade}</p>
                <p><b>Estado:</b> ${user.cliente.endereco?.estado}</p>
                <p><b>Mensagem:</b> ${message}</p>
                <p><b>Caso seja do seu interesse entre em contato com o mesmo através dos contatos informados acima ou agende uma conversa direto pelo site!</b></p>
                <p><b><a href="https://justissimo-frontend.herokuapp.com/">Clique aqui para acessar o Justíssimo</a></b></p>
                <p><b>Atenciosamente,<br> Equipe Justissimo</b></p>
                <img src="cid:justissimo_logo"}>`,
                subject: "Contato de cliente",
                to: lawyer.usuario?.email ?? "",
                attachments: [{
                    filename: 'logo_justissimo.png',
                    path: '././src/images/logo_justissimo.png',
                    cid: 'justissimo_logo' //same cid value as in the html img src
                }]
            });
            
            await prisma.$transaction([messageCreate]); // Executa a query no banco de dados (commit) caso não haja erros
        } catch (error) {
            throw new DomainError("Não foi possível enviar a mensagem, tente novamente mais tarde!");
        }

        return;
    }
}

export { MessageUseCase }