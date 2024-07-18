import { Coffee } from "../../entities/coffee";
import { CoffeeRepository } from "../coffee-repository";

export class CoffeeInMemoryRepository implements CoffeeRepository {
    coffees: Coffee[] = [];
    async save(coffee: Coffee): Promise<void> {
        const id = this.coffees.length + 1;
        coffee.setId(id);
        this.coffees.push(coffee);
    }
    async findAll() {
        return this.coffees;
    }
    async findById(id: number) {
        const coffee = this.coffees.find((coffee) => coffee.id === id);
        return coffee || null;
    }
}
