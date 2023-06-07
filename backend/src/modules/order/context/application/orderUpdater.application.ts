import { OrderRepository, FindOrderByIdService, Order, OrderPrimitiveData, ExpiredOrders, TotalOrders, UserIdOrders } from '../domain'

export class OrderUpdater {
    private readonly _orderRepository: OrderRepository
    private readonly _findOrderByIdService: FindOrderByIdService

    constructor(orderRepository: OrderRepository) {
        this._orderRepository = orderRepository
        this._findOrderByIdService = new FindOrderByIdService(this._orderRepository)
    }

    async run(id: number, data: OrderPrimitiveData): Promise<void> {
        const foundOrder = await this._findOrderByIdService.run(id)

        const newOrder = new Order({
            date: data.date ?? foundOrder.date,
            expired: new ExpiredOrders(data.expired ?? foundOrder.expired),
            total: new TotalOrders(data.total ?? foundOrder.total),
            idUsers: new UserIdOrders(data.idUsers ?? foundOrder.idUsers)
        })

        await this._orderRepository.update(id, newOrder)
    }
}
