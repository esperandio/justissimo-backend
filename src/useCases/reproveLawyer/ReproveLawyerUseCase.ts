import { prisma } from "../../database";
import { DomainError, LawyerNotFoundError } from "../../errors";
import { mail } from "../../mail";
import { NonEmptyString } from "../../validators";

interface IreproveLawyerRequest {
    id_lawyer: string;
    id_user: string;
}

class ReproveLawyerUseCase {
    async execute(aproveRequest: IreproveLawyerRequest){
        const id_user = Number.parseInt(NonEmptyString.validate("id_user", aproveRequest.id_user).value);
        const id_advogado = Number.parseInt(NonEmptyString.validate("id_advogado", aproveRequest.id_lawyer).value);

        if (id_user <= 0) {
            throw new DomainError("Id do usuário inválido!");
        }

        if (id_advogado <= 0) {
            throw new DomainError("Id do advogado inválido!");
        }

        const user = await prisma.usuario.findFirst({
            where: {
                id_usuario: id_user,
                tipo_usuario: "administrador",
            },
        });

        if (!user) {
            throw new DomainError("Usuário não existe ou não é um administrador!");
        }

        const lawyer = await prisma.advogado.findFirst({
            where: {
                id_advogado: id_advogado,
            },
            select: {
                nome: true,
                usuario: {
                    select: {
                        email: true,
                    }
                },
            }
        });

        if (!lawyer) {
            throw new LawyerNotFoundError();
        }
        
        const name = lawyer.nome.split(" ")[0];

        try {
            const updateLawyer = prisma.advogado.update({
                where: {
                    id_advogado: id_advogado,
                },
                data: {
                    autorizado: false,
                    dt_reprovacao: new Date(),
                },
            });
            
            await mail.sendEmail({
                from: process.env.SMTP_AUTH_USER ?? "",
                html: `<p>Olá, ${name},<br> </p>
                <p>Seu cadastro foi reprovado! Não foi possivel verificar seu registro de CNA. Verifique os dados informados novamente e valide se os mesmos estão atualizados na sua Seccional. Para soliciatar uma nova aprovação entre em contato através do e-mail: justissimo.corporation@gmail.com.</p>
                <p><b><a href="https://justissimo-frontend.herokuapp.com/">Clique aqui para acessar o Justíssimo</a></b></p>
                <p><b>Atenciosamente,<br> Equipe Justissimo</b></p>
                <img src="cid:justissimo_logo"}>`,
                subject: "Reprovação de cadastro (CNA)",
                to: lawyer.usuario?.email ?? "",
                attachments: [{
                    filename: 'logo_justissimo.png',
                    path: '././src/images/logo_justissimo.png',
                    cid: 'justissimo_logo' //same cid value as in the html img src
                }]
            });

            await prisma.$transaction([updateLawyer]);
    
            } catch (error) {
                throw new DomainError("Não foi possível enviar a mensagem, tente novamente mais tarde!");
            }

        return;
    }
}

export { ReproveLawyerUseCase }