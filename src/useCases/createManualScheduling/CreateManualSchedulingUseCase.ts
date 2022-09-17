import { prisma } from "../../database";
import { DomainError, NotFoundError, ClientNotFoundError, LawyerNotFoundError } from "../../errors";
import { mail } from "../../mail";
import { Email } from "../../validators";
import { ParmsScheduling } from "../../validators/parms-scheduling";
import { TimeForScheduling } from "../../validators/time-for-scheduling";

interface ICreateSchedulingRequest {
    fk_advogado:        number;
    fk_advogado_area:   number;
    data_agendamento:   string;
    nome_cliente:       string;
    email_cliente:      string;    
    horario:            string;  
    dia:                string;        
    observacao:         string;
}

class CreateManualSchedulingUseCase {
    async execute(createSchedulingRequest: ICreateSchedulingRequest) {
        ParmsScheduling.validate(createSchedulingRequest, true);
        
        const daysOfWeek = ['DOMINGO', 'SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO'];
        const date_scheduling = new Date(createSchedulingRequest.data_agendamento + "T00:00:00.000Z");
        const hour_scheduling = new Date("0001-01-01T" + createSchedulingRequest.horario + ":00.000Z");
        let email_lawyer = "";

        const schedulingsAlreadyDoneToSpecificDay = await prisma.agendamento.findMany({
            where: {
                data_agendamento: {
                    gte: new Date(createSchedulingRequest.data_agendamento + "T00:00:00.000Z"),
                    lte: new Date(createSchedulingRequest.data_agendamento + "T00:00:00.000Z")
                },
            },
        });

        const userLawyer = await prisma.advogado.findUnique({
            where: {
                id_advogado: createSchedulingRequest.fk_advogado,
            },
            include: {
                usuario: {
                    select: {
                        email: true,
                    }
                }
            }
        });

        if (!userLawyer) {
            throw new LawyerNotFoundError();
        }
        
        // validar se o email do advogado é válido pois será enviado um email para ele
        if (userLawyer.usuario != null) {
            Email.validate(userLawyer.usuario.email);
            email_lawyer = userLawyer.usuario.email;
        }

        const userLawyerArea = await prisma.advogadoArea.findFirst({
            where: {
                fk_advogado: createSchedulingRequest.fk_advogado,
                fk_area_atuacao: createSchedulingRequest.fk_advogado_area,
            }
        });

        if (!userLawyerArea) {
            throw new NotFoundError('Advogado não pertence a área de atuação informada!');
        }

        const schedulingAlreadyExists = await prisma.agendamento.findFirst({
            where: {
                fk_advogado: createSchedulingRequest.fk_advogado,
                data_agendamento: date_scheduling,
                horario: hour_scheduling
            }
        });

        if (schedulingAlreadyExists) {
            throw new DomainError('Não foi possível cadastrar o agendamento pois já existe um agendamento para a data e horário informados!');
        }
        
        const configLawyerSchedule = await prisma.configuracao_agenda.findFirst({
            where: {
                fk_advogado: userLawyer.id_advogado,
                dia: daysOfWeek[date_scheduling.getUTCDay()]
            }
        });

        if (!configLawyerSchedule) {
            throw new DomainError('Não foi possivel cadastrar o agendameto pois o advogado não atende no dia informado!');
        }

        TimeForScheduling.validate(schedulingsAlreadyDoneToSpecificDay, configLawyerSchedule.hora_inicial, configLawyerSchedule.hora_final, hour_scheduling, configLawyerSchedule.duracao);

        await prisma.agendamento.create({
            data: {
                fk_advogado: createSchedulingRequest.fk_advogado,
                fk_cliente: 2,
                fk_advogado_area: createSchedulingRequest.fk_advogado_area,
                contato_cliente: createSchedulingRequest.email_cliente,
                nome_cliente: createSchedulingRequest.nome_cliente,
                data_agendamento: date_scheduling,
                duracao: configLawyerSchedule.duracao,
                horario: hour_scheduling,
                observacao: createSchedulingRequest.observacao,
            }
        });

        const emails = [email_lawyer, createSchedulingRequest.email_cliente];

        // Padronizar informação de data e hora para o formato brasileiro
        const daysOfWeekFormated = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
        const date = createSchedulingRequest.data_agendamento.split('-');
        const date_scheduling_formatted = date[2] + '/' + date[1] + '/' + date[0];
        const dayOfWeek = daysOfWeekFormated[date_scheduling.getUTCDay()];

        emails.forEach(function (to, i) {
            mail.sendEmail({
                from: process.env.SMTP_AUTH_USER ?? "",
                html: `<p>Olá, o agendamento foi realizado com sucesso!<br> </p>
                <p><b>Cliente:</b> ${createSchedulingRequest.nome_cliente}</p>
                <p><b>Data:</b> ${date_scheduling_formatted}</p>
                <p><b>Horário:</b> ${createSchedulingRequest.horario}</p>
                <p><b>Dia:</b> ${dayOfWeek}</p>
                <p><b>Observação:</b> ${createSchedulingRequest.observacao}</p>
                <p><b>Atenciosamente,<br> Equipe Justissimo</b></p>
                <img src="cid:justissimo_logo"}>`,
                subject: "Confirmação de Agendamento",
                to: to,
                attachments: [{
                    filename: 'logo_justissimo.png',
                    path: '././src/images/logo_justissimo.png',
                    cid: 'justissimo_logo' //same cid value as in the html img src
                }]
            });
        });

    }
}

export { CreateManualSchedulingUseCase }