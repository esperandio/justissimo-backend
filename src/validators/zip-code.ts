import { DomainError } from "../errors";

class InvalidZipCodeError extends DomainError {
    constructor (zipcode: string) {
        super(`O CEP informado está inválido, verifique por gentileza. Valor informado: (${zipcode}).\nO CEP deve conter 8 dígitos, do tipo numérico [0 à 9].`)
    }
}

export class ZipCode {
    public static validate(zipcode: string): string {
        if (zipcode.length != 8) {
            throw new InvalidZipCodeError(zipcode);
        }

        if (zipcode.match(/[a-z]/i)) {
            throw new InvalidZipCodeError(zipcode);
        }

        return zipcode;
    }
}