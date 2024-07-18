import { beforeEach, describe, expect, it } from "bun:test";
import { ListCoffee } from "./list-coffee";
import { CoffeeInMemoryRepository } from "../../core/repository/in-memory-repository.ts/coffee-in-memory-repository";
import { faker } from "@faker-js/faker";
import { Coffee, CoffeeTypes } from "../../core/entities/coffee";

describe("test the list coffee service", () => {
    let sut: ListCoffee;
    let coffeeRepository: CoffeeInMemoryRepository;
    beforeEach(() => {
        coffeeRepository = new CoffeeInMemoryRepository();
        sut = new ListCoffee(coffeeRepository);
    });
    it("should list all coffees", async () => {
        const coffee = new Coffee(
            faker.person.fullName(),
            faker.lorem.sentence(),
            faker.number.int(),
            faker.image.avatarGitHub(),
            [CoffeeTypes.Mocha]
        );
        coffeeRepository.save(coffee);
        await sut.execute({}).then((response) => {
            expect(response.isRight()).toBe(true);
            if (Array.isArray(response.value)) {
                expect(response.value[0].name).toBe(coffee.name);
            }
        });
    });
    it("should list a coffee by id", () => {
        const coffee = new Coffee(
            faker.person.fullName(),
            faker.lorem.sentence(),
            faker.number.int(),
            faker.image.avatarGitHub(),
            [CoffeeTypes.Mocha]
        );
        coffeeRepository.save(coffee);
        const id = coffee.id;
        sut.execute({ id }).then((response) => {
            expect(response.isRight()).toBe(true);
            if (Array.isArray(response.value)) {
                expect(response.value[0].name).toBe(coffee.name);
            }
        });
    });
    it("should return an error when the coffee is not found", () => {
        const id = 1;
        sut.execute({ id }).then((response) => {
            expect(response.isLeft()).toBe(true);
            expect(response.value?.message).toBe("Coffee not found");
        });
    });
});
