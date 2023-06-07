import { OrderRepository, FindOrderByIdService } from '../domain'

export class OrderDeleter {
    private readonly _orderRepository: OrderRepository
    private readonly _findOrderByIdService: FindOrderByIdService

    constructor(orderRepository: OrderRepository) {
        this._orderRepository = orderRepository
        this._findOrderByIdService = new FindOrderByIdService(this._orderRepository)
    }

    async run(id: number): Promise<void> {
        await this._findOrderByIdService.run(id)
        await this._orderRepository.delete(id)
    }
}
