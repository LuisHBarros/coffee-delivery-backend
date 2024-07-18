import { Either, left, right } from "../../../core/either";
import { Coffee } from "../../../core/entities/coffee";
import { ResourceNotFound } from "../../../core/errors/errors/resource-not-found";
import { CoffeeRepository } from "../../../core/repository/coffee-repository";

interface ListCoffeeDTO {
    id?: number;
}

type ListCoffeeReturn = Promise<Either<ResourceNotFound, Coffee[]>>;

export class ListCoffee {
    constructor(private repository: CoffeeRepository) {}

    async execute({ id }: ListCoffeeDTO): ListCoffeeReturn {
        if (id) {
            const response = await this.repository.findById(id);
            if (!response) {
                return left(new ResourceNotFound("Coffee not found"));
            }
            return right([response]);
        }
        const response = await this.repository.findAll();
        return right(response);
    }
}
