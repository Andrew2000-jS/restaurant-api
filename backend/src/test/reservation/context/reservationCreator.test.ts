import { expect, it, describe } from 'vitest'
import { DbMock } from '../mock'
import { ReservationCreator } from 'modules/reservation/context/application'

describe('Reservation creator', () => {
  it('should can create a reservation', async () => {
    const today = new Date()
    const hour = `${today.getHours()}:${today.getMinutes()}`
    const dbMock = new DbMock()
    const reservationCreator = new ReservationCreator(dbMock)

    const newReservation = {
      date: today,
      hour,
      count: 5,
      status: true,
      user: { id: 1 }
    }

    await reservationCreator.run(newReservation)

    expect(dbMock.db.length).toBe(1)
  })
})
