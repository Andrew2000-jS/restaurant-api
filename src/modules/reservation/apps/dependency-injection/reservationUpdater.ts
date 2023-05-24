import { PostgresReservationRepository } from '../../context/infrastructure'
import { ReservationUpdater } from '../../context/application'

const reservationRepository = new PostgresReservationRepository()

export default new ReservationUpdater(reservationRepository)
