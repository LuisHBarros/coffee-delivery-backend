import { Either, left, right } from "../../../core/either";
import { Coffee, CoffeeTypes } from "../../../core/entities/coffee";
import { BadRequest } from "../../../core/errors/errors/bad-request";
import { ServicesError } from "../../../core/errors/services-error";
import type { CoffeeRepository } from "../../../core/repository/coffee-repository";

interface CreateCoffeeDTO {
    name: string;
    description: string;
    price: number;
    image: string;
    type: string;
}

type CreateCoffeeReturn = Promise<Either<ServicesError, null>>;
export class createCoffee {
    repository: CoffeeRepository;

    constructor(repository: CoffeeRepository) {
        this.repository = repository;
    }
    async execute({
        name,
        description,
        price,
        image,
        type,
    }: CreateCoffeeDTO): CreateCoffeeReturn {
        const typeArray = type.split(", ");
        const coffeeTypes = typeArray.map((type) => {
            if (Object.values(CoffeeTypes).includes(type as CoffeeTypes)) {
                return type as CoffeeTypes;
            }
            return undefined;
        });

        // Verifique se algum tipo é inválido
        if (coffeeTypes.includes(undefined)) {
            return left(new BadRequest("Invalid coffee type"));
        } // @ts-expect-error - The undefined value is already checked
        const coffee = new Coffee(name, description, price, image, coffeeTypes);
        await this.repository.save(coffee);
        return right(null);
    }
}
