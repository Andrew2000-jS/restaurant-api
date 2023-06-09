import { PostgresReservationRepository } from '../../context/infrastructure'
import { ReservationFinder } from '../../context/application'

const reservationRepository = new PostgresReservationRepository()

export default new ReservationFinder(reservationRepository)
