import { OrderRepository, OrderPrimitiveData, Order, ExpiredOrders, TotalOrders, UserIdOrders } from '../domain'

export class OrderCreator {
    private readonly _orderRepository: OrderRepository

    constructor(orderRepository: OrderRepository) {
        this._orderRepository = orderRepository
    }

    async run(orderRepository: OrderPrimitiveData): Promise<Order> {
        const data = new Order({
            date: orderRepository.date,
            expired: new ExpiredOrders(orderRepository.expired),
            total: new TotalOrders(orderRepository.total),
            idUsers: new UserIdOrders(orderRepository.idUsers),
            orders: orderRepository.orders
        })

        console.log(data)

        const newOrder = await this._orderRepository.create(data)
        return newOrder
    }
}
