import { ServicesError } from "../services-error";

export class ResourceNotFound implements ServicesError {
    message: string;

    constructor(message: string) {
        this.message = message;
    }
}
