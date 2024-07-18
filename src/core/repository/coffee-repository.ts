import { Coffee } from "../entities/coffee";

export interface CoffeeRepository {
    save(coffee: Coffee): Promise<void>;
    findAll(): Promise<Coffee[]>;
    findById(id: number): Promise<Coffee | null>;
}
