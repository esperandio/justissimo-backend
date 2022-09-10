import { DomainError } from "../errors";

class InvalidCpfError extends DomainError {
    constructor (cpf: string) {
        super(`O CPF informado está inválido, verifique por gentileza. Valor informado: ${cpf}).`)
    }
}

class InvalidCnpjError extends DomainError {
    constructor (cnpj: string) {
        super(`O CNPJ informado está inválido, verifique por gentileza. Valor informado: ${cnpj}).`)
    }
}

export class CpfCnpj {
    public static validateCpf(cpf: string): string {
        if (cpf.length != 11 && cpf.length != 14) {
            throw new InvalidCpfError(cpf);
        }
        return cpf;
    }
    
    public static validateCnpj(cnpj: string): string {
        if (cnpj.length != 14 && cnpj.length != 18) {
            throw new InvalidCnpjError(cnpj);
        }
        return cnpj;
    }
}