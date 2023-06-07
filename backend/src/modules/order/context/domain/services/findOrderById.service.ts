import { Order } from '../entities'
import { NotFoundException } from '../exceptions'
import { OrderRepository } from '../repositories'

export class FindOrderByIdService {
    private readonly _orderRepository: OrderRepository

    constructor(orderRepository: OrderRepository) {
        this._orderRepository = orderRepository
    }

    async run(id: number): Promise<Order> {
        const foundOrder = await this._orderRepository.findById(id)

        if (!foundOrder) throw new NotFoundException()

        return foundOrder
    }
}
