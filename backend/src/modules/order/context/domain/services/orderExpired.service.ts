import { OrderRepository } from '../repositories'

export class OrderExpired {
    private readonly _orderRepository: OrderRepository

    constructor(orderRepository: OrderRepository) {
        this._orderRepository = orderRepository
    }

    async run(id: number): Promise<boolean> {
        const foundOrder = await this._orderRepository.findById(id)

        if (!foundOrder) return false

        return true
    }
}
