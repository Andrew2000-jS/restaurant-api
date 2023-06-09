import { Order, OrderRepository } from '../../domain'
import { CommonQueries, PostgresDB } from '../../../../../shared'

export class PostgresOrderRepository implements OrderRepository {
  private readonly _instance: PostgresDB

  constructor() {
    this._instance = PostgresDB.getInstance()
  }

  async create(order: Order): Promise<Order> {
    const columns = ['date', 'total', 'idUsers', 'orderlist', 'expired']
    const values = [order.date, order.total._value, order.idUsers._value, order.orders, order.expired._value]
    const insert = CommonQueries.insert('orders', columns, values)

    const result = await this._instance.query(insert, values)
    return result
  }

  async update(id: number, order: Order): Promise<Order> {
    const query = 'UPATE orders SET date=$1, total=$2, idUsers=$3, orderlist=$4, expired=$5 WHERE id=$6'
    const values = [order.date, order.total._value, order.idUsers._value, order.orders, order.expired._value, Number(id)]

    const result = await this._instance.query(query, values)
    return result
  }

  async delete(id: number): Promise<void> {
    const query = 'DELETE FROM orders WHERE id=$1'

    const result = await this._instance.query(query, [Number(id)])
    return result
  }

  async findAll(): Promise<Order[]> {
    const getAll = CommonQueries.findAll('orders')
    const result = await this._instance.query(getAll, [], true)
    return result
  }

  async findById(id: number): Promise<Order> {
    const foundOrder = CommonQueries.findById('orders')
    const result = await this._instance.query(foundOrder, [Number(id)])
    return result
  }
}
