import { NotFoundException, Order, OrderRepository } from '../domain'

export class OrderFinder {
    private readonly _orderRepository: OrderRepository

    constructor(orderRepository: OrderRepository) {
        this._orderRepository = orderRepository
    }

    async run(): Promise<Order[]> {
        const foundOrder = await this._orderRepository.findAll()

        if (!foundOrder) throw new NotFoundException()

        return foundOrder
    }
}
