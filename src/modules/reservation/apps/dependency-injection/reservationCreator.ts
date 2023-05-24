import { PostgresReservationRepository } from '../../context/infrastructure'
import { ReservationCreator } from '../../context/application'

const reservationRepository = new PostgresReservationRepository()

export default new ReservationCreator(reservationRepository)
