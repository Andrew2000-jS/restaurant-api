import { PostgresReservationRepository } from '../../context/infrastructure'
import { ReservationDeleter } from '../../context/application'

const reservationRepository = new PostgresReservationRepository()

export default new ReservationDeleter(reservationRepository)
