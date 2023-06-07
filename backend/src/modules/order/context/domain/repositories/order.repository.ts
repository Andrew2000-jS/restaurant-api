import { Order } from '../entities'

export interface OrderRepository {
    create: (order: Order) => Promise<Order>
    update: (id: number, order: Order) => Promise<Order>
    delete: (id: number) => Promise<void>
    findById: (id: number) => Promise<Order>
    findAll: () => Promise<Order[]>
}
