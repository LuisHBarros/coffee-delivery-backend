import { beforeEach, describe, expect, it } from "bun:test";
import { GetOrder } from "./get-order";
import { Address, Card, Client, Order } from "../../../core/entities/order";
import { OrderInMemoryRepository } from "../../../core/repository/in-memory-repository.ts/order-in-memory-repository";
import { faker } from "@faker-js/faker";
import { Coffee, CoffeeTypes } from "../../../core/entities/coffee";
import { ResourceNotFound } from "../../../core/errors/errors/resource-not-found";

describe("test the get order service", () => {
    let sut: GetOrder;
    let orderRepository: OrderInMemoryRepository;
    beforeEach(() => {
        orderRepository = new OrderInMemoryRepository();
        sut = new GetOrder(orderRepository);
    });
    it("should return an order", async () => {
        const client = new Client(
            faker.person.fullName(),
            faker.phone.number()
        );
        const coffee = new Coffee(
            faker.person.fullName(),
            faker.lorem.sentence(),
            faker.number.int(),
            faker.image.avatarGitHub(),
            [CoffeeTypes.Mocha, CoffeeTypes.Espresso]
        );
        const card = [new Card(coffee, 1)];
        const address = new Address(
            faker.location.zipCode(),
            faker.location.street(),
            faker.number.int(),
            faker.location.secondaryAddress(),
            faker.location.county(),
            faker.location.city(),
            faker.location.state()
        );
        const order = new Order(client, card, address);

        await orderRepository.createOrder(order);
        const response = await sut.execute({ orderId: 1 });
        expect(response.isRight()).toBe(true);
        // @ts-expect-error value is not null
        expect(response.value.client.name).toBe(client.name);
    });
    it("should return an error when the order is not found", async () => {
        const response = await sut.execute({ orderId: 1 });
        expect(response.isLeft()).toBe(true);
        // @ts-expect-error value is not null
        expect(response.value?.message).toBe("Order not found");
        expect(response.value).toBeInstanceOf(ResourceNotFound);
    });
});

