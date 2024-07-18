import { ServicesError } from "../services-error";

export class BadRequest implements ServicesError {
    message: string;

    constructor(message: string) {
        this.message = message;
    }
}
