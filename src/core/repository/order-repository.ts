import { Order } from "../entities/order";

export interface OrderRepository {
    createOrder(order: Order): Promise<void>;
    getOrderById(orderId: number): Promise<Order | null>;
    updateOrder(order: Order): Promise<void>;
}

