import { PostgresOrderRepository } from '../../context/infrastructure'
import { OrderCreator } from '../../context/application'

const postgresOrderRepository = new PostgresOrderRepository()

export default new OrderCreator(postgresOrderRepository)
