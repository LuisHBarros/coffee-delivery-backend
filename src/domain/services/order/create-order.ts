import { Either, left, right } from "../../../core/either";
import { Address, Card, Client, Order } from "../../../core/entities/order";
import { ResourceNotFound } from "../../../core/errors/errors/resource-not-found";
import { ServicesError } from "../../../core/errors/services-error";
import { CoffeeRepository } from "../../../core/repository/coffee-repository";
import { OrderRepository } from "../../../core/repository/order-repository";

export interface CreateOrderParams {
    address: {
        cep: string;
        street: string;
        number: number;
        complement: string;
        district: string;
        city: string;
        state: string;
    };
    products: {
        product: {
            id: number;
        };
        quantity: number;
    }[];
    client: {
        name: string;
        tel: string;
    };
}

type CreateOrderResponse = Promise<Either<ServicesError, null>>;

export class CreateOrder {
    constructor(
        private orderRepository: OrderRepository,
        private coffeeRepository: CoffeeRepository
    ) {}

    async execute(order: CreateOrderParams): CreateOrderResponse {
        const client = new Client(order.client.name, order.client.tel);
        const products = await Promise.all(
            order.products.map(async (product) => {
                const coffee = await this.coffeeRepository.findById(
                    product.product.id
                );
                if (coffee === null) {
                    return null;
                }
                return new Card(coffee, product.quantity);
            })
        );
        const address = new Address(
            order.address.cep,
            order.address.street,
            order.address.number,
            order.address.complement,
            order.address.district,
            order.address.city,
            order.address.state
        );

        if (products.includes(null)) {
            return left(new ResourceNotFound("Product not found"));
        }
        const orderEntity = new Order(client, products as Card[], address);

        await this.orderRepository.createOrder(orderEntity);
        return right(null);
    }
}

