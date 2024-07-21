import { Either, left, right } from "../../../core/either";
import { Order } from "../../../core/entities/order";
import { ResourceNotFound } from "../../../core/errors/errors/resource-not-found";
import { ServicesError } from "../../../core/errors/services-error";
import { OrderRepository } from "../../../core/repository/order-repository";

type GetOrderResponse = Promise<Either<ServicesError, Order>>;

interface GetOrderParams {
    orderId: number;
}
export class GetOrder {
    constructor(private orderRepository: OrderRepository) {}

    async execute({ orderId }: GetOrderParams): GetOrderResponse {
        const order = await this.orderRepository.getOrderById(orderId);
        if (order === null) {
            return left(new ResourceNotFound("Order not found"));
        }
        return right(order);
    }
}

