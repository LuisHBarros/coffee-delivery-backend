import { beforeEach, describe, expect, it } from "bun:test";
import { faker } from "@faker-js/faker";
import { createCoffee } from "./create-coffee";
import { CoffeeInMemoryRepository } from "../../core/repository/in-memory-repository.ts/coffee-in-memory-repository";

describe("test the create coffee service", () => {
    let coffeeRepository: CoffeeInMemoryRepository;
    let sut: createCoffee;
    beforeEach(() => {
        coffeeRepository = new CoffeeInMemoryRepository();

        sut = new createCoffee(coffeeRepository);
    });
    it("should create a new coffee", async () => {
        const coffee = {
            name: faker.person.fullName(),
            description: faker.lorem.sentence(),
            price: faker.number.int(),
            image: faker.image.avatarGitHub(),
            type: "mocha",
        };
        const response = await sut.execute(coffee);
        expect(response.isRight()).toBe(true);
        expect(coffeeRepository.coffees[0].name).toBe(coffee.name);
    });
    it("should return an error when the type is invalid", async () => {
        const coffee = {
            name: faker.person.fullName(),
            description: faker.lorem.sentence(),
            price: faker.number.int(),
            image: faker.image.avatarGitHub(),
            type: "invalid",
        };
        const response = await sut.execute(coffee);
        expect(response.isLeft()).toBe(true);
        expect(response.value?.message).toBe("Invalid coffee type");
    });
});
