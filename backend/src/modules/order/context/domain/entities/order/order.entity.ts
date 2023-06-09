import { TotalOrders, ExpiredOrders, UserIdOrders } from './valueObjects'
import { EntityRoot } from '../entityRoot'

export interface OrderPrimitiveData {
  date: Date
  total: number
  idUsers: number
  expired: boolean
  orders: any[]
}

export class Order extends EntityRoot<Order, OrderPrimitiveData> {
  readonly date: Date
  readonly total: TotalOrders
  readonly idUsers: UserIdOrders
  readonly expired: ExpiredOrders
  readonly orders: any[]

  constructor({
    date,
    total,
    idUsers,
    expired,
    orders
  }: {
    date: Date
    total: TotalOrders
    idUsers: UserIdOrders
    expired: ExpiredOrders
    orders: any[]
  }) {
    super()
    this.orders = orders
    this.date = date
    this.total = total
    this.idUsers = idUsers
    this.expired = expired
  }

  static create(
    date: Date,
    total: TotalOrders,
    idUsers: UserIdOrders,
    expired: ExpiredOrders,
    orders: any[]
  ): Order {
    return new Order({
      orders,
      date,
      total,
      idUsers,
      expired
    })
  }

  fromPrimitives(plainData: {
    date: Date
    total: number
    idUsers: number
    expired: boolean
    orders: any[]
  }): Order {
    return new Order({
      orders: plainData.orders,
      date: plainData.date,
      total: new TotalOrders(plainData.total),
      idUsers: new UserIdOrders(plainData.idUsers),
      expired: new ExpiredOrders(plainData.expired)
    })
  }

  toPrimitives(): OrderPrimitiveData {
    return {
      orders: this.orders,
      date: this.date,
      total: this.total._value,
      idUsers: this.idUsers._value,
      expired: this.expired._value
    }
  }
}
