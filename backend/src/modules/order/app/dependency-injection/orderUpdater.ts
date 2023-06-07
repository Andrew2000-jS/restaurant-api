import { PostgresOrderRepository } from '../../context/infrastructure'
import { OrderUpdater } from '../../context/application'

const postgresOrderRepository = new PostgresOrderRepository()

export default new OrderUpdater(postgresOrderRepository)
