import { Order } from "../../entities/order";
import { OrderRepository } from "../order-repository";

export class OrderInMemoryRepository implements OrderRepository {
    orders: Order[] = [];

    async createOrder(order: Order): Promise<void> {
        const id = this.orders.length + 1;
        order.id = id;

        this.orders.push(order);
    }

    async getOrderById(orderId: number): Promise<Order | null> {
        const order = this.orders.find((o) => o.id === orderId);
        if (!order) {
            return null;
        }
        return order;
    }

    async updateOrder(order: Order): Promise<void> {
        const orderIndex = this.orders.findIndex((o) => o.id === order.id);
        if (orderIndex === -1) {
            throw new Error(`Order with id ${order.id} not found`);
        }
        this.orders[orderIndex] = order;
    }
}

