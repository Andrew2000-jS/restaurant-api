import { PostgresOrderRepository } from '../../context/infrastructure'
import { OrderFinder } from '../../context/application'

const postgresOrderRepository = new PostgresOrderRepository()

export default new OrderFinder(postgresOrderRepository)
