import { Divulgacao } from "@prisma/client";
import { prisma } from "../../../database";


class ListAllDivulgationUseCase {

  async execute() {

    const divulgations = await prisma.divulgacao.findMany({
        include: {
            cliente: true,
            areaAtuacao: {
                select: {
                    titulo: true,
                }
            }
        }
    });
    console.log(divulgations);
    return divulgations;
  }
}

export { ListAllDivulgationUseCase };