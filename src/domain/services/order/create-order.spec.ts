import { beforeEach, describe, expect, it } from "bun:test";
import { OrderInMemoryRepository } from "../../../core/repository/in-memory-repository.ts/order-in-memory-repository";
import { CoffeeInMemoryRepository } from "../../../core/repository/in-memory-repository.ts/coffee-in-memory-repository";
import { CreateOrder } from "./create-order";
import { faker } from "@faker-js/faker";
import { Coffee, CoffeeTypes } from "../../../core/entities/coffee";

describe("test the create order service", () => {
    let orderRepository: OrderInMemoryRepository;
    let coffeeRepository: CoffeeInMemoryRepository;
    let sut: CreateOrder;
    beforeEach(() => {
        orderRepository = new OrderInMemoryRepository();
        coffeeRepository = new CoffeeInMemoryRepository();
        sut = new CreateOrder(orderRepository, coffeeRepository);
    });
    it("should create a new order", async () => {
        const coffee = new Coffee(
            faker.person.fullName(),
            faker.lorem.sentence(),
            faker.number.int(),
            faker.image.avatarGitHub(),
            [CoffeeTypes.Mocha, CoffeeTypes.Espresso]
        );
        await coffeeRepository.save(coffee);
        const order = {
            address: {
                cep: faker.location.zipCode(),
                street: faker.location.street(),
                number: faker.number.int(),
                complement: faker.location.secondaryAddress(),
                district: faker.location.county(),
                city: faker.location.city(),
                state: faker.location.state(),
            },
            products: [
                {
                    product: {
                        id: 1,
                    },
                    quantity: 1,
                },
            ],
            client: {
                name: faker.person.fullName(),
                tel: faker.phone.number(),
            },
        };
        const response = await sut.execute(order);
        expect(response.isRight()).toBe(true);
        expect(orderRepository.orders[0].client.name).toBe(order.client.name);
    });
    it("should return an error when the product is not found", async () => {
        const order = {
            id: faker.number.int(),
            address: {
                cep: faker.location.zipCode(),
                street: faker.location.street(),
                number: faker.number.int(),
                complement: faker.location.secondaryAddress(),
                district: faker.location.county(),
                city: faker.location.city(),
                state: faker.location.state(),
            },
            products: [
                {
                    product: {
                        id: 1,
                    },
                    quantity: 1,
                },
            ],
            client: {
                name: faker.person.fullName(),
                tel: faker.phone.number(),
            },
        };
        const response = await sut.execute(order);
        expect(response.isLeft()).toBe(true);
    });
});

