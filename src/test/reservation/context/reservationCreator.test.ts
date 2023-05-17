import { expect, it, describe } from 'vitest'
import { DbMock } from '../mock'
import { ReservationCreator } from 'modules/reservation/context/application'
import {
  Reservation,
  ReservationAvalible,
  ReservationHour,
  ReservationPeopleCount,
  ReservationUser
} from 'modules/reservation/context/domain'

describe('Reservation creator', () => {
  it('should can create a reservation', async () => {
    const today = new Date()
    const hour = `${today.getHours()}:${today.getMinutes()}`
    const dbMock = new DbMock()
    const reservationCreator = new ReservationCreator(dbMock)

    const newReservation = new Reservation({
      date: today,
      hour: new ReservationHour(hour),
      peopleCount: new ReservationPeopleCount(5),
      reservationStatus: new ReservationAvalible(true),
      user: new ReservationUser({ id: 1 })
    })

    await reservationCreator.run(newReservation)

    expect(dbMock.db.length).toBe(1)
  })
})
