import { TotalOrders, ExpiredOrders, UserIdOrders } from './valueObjects'
import { EntityRoot } from '../entityRoot'

export interface OrderPrimitiveData {
  date: Date
  total: number
  idUsers: number
  expired: boolean
}

export class Order extends EntityRoot<Order, OrderPrimitiveData> {
  readonly date: Date
  readonly total: TotalOrders
  readonly idUsers: UserIdOrders
  readonly expired: ExpiredOrders

  constructor({
    date,
    total,
    idUsers,
    expired
  }: {
    date: Date
    total: TotalOrders
    idUsers: UserIdOrders
    expired: ExpiredOrders
  }) {
    super()
    this.date = date
    this.total = total
    this.idUsers = idUsers
    this.expired = expired
  }

  static create(
    date: Date,
    total: TotalOrders,
    idUsers: UserIdOrders,
    expired: ExpiredOrders
  ): Order {
    return new Order({
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
  }): Order {
    return new Order({
      date: plainData.date,
      total: new TotalOrders(plainData.total),
      idUsers: new UserIdOrders(plainData.idUsers),
      expired: new ExpiredOrders(plainData.expired)
    })
  }

  toPrimitives(): OrderPrimitiveData {
    return {
      date: this.date,
      total: this.total._value,
      idUsers: this.idUsers._value,
      expired: this.expired._value
    }
  }
}
