import { prisma } from "../../database";

interface IListSchedulingRequest{

}

class ListSchedulingUseCase {
    async execute(listSchedulingRequest: IListSchedulingRequest) {
        const data = await prisma.agendamento.findMany({
            where: {
              data_agendamento: {
                gte: new Date("2022-01-01"),
                lt:  new Date("2022-01-02")
              },
            },
          });
          console.log(data);
        return true;
    }
}

export { ListSchedulingUseCase }