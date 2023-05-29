import { OrderPrimitiveData, Order } from '../entities'

export interface OrderInterface {
    create: (order: OrderPrimitiveData) => Promise<Order>
    update: (id: number, order: OrderPrimitiveData) => Promise<Order>
    delete: (id: number) => Promise<void>
    findById: (id: number) => Promise<Order>
    findAll: () => Promise<Order[]>
}
