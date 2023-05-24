import { CommonQueries, PostgresDB } from '../../../../../shared'
import { ReservationRepository, Reservation } from '../../domain'

export class PostgresReservationRepository implements ReservationRepository {
  private readonly _instance: PostgresDB

  constructor() {
    this._instance = PostgresDB.getInstance()
  }

  async create(reservation: Reservation): Promise<Reservation> {
    const { date, hour, count, user, status } = reservation

    const columns = [
      'date',
      'hour',
      'count',
      'status',
      'id_users'
    ]
    const values = [date, hour._value, count._value, status._value, user._value]
    const insert = CommonQueries.insert('reservations', columns, values)

    const result = await this._instance.query(insert, values)
    return result
  }

  async update(id: string, reservation: Reservation): Promise<Reservation> {
    const { date, hour, count, status } = reservation
    const query =
      'UPDATE reservations SET date=$1, hour=$2, count=$3, status=$4 WHERE id=$5'
    const values = [date, hour._value, count._value, status._value, Number(id)]

    const result = await this._instance.query(query, values)
    return result
  }

  async delete(id: string): Promise<void> {
    const query = CommonQueries.delete('reservations', 'id')
    await this._instance.query(query, [Number(id)])
  }

  async getAll(): Promise<Reservation[]> {
    const query = CommonQueries.selectAll('reservations')
    const result = await this._instance.query(query)
    if (result === undefined) {
      return []
    }
    return result
  }

  async getById(id: string): Promise<Reservation | null> {
    const query = CommonQueries.findById('reservations')
    const result = await this._instance.query(query, [Number(id)])
    return result
  }

  async getByUser(userId: string): Promise<Reservation[]> {
    const query = 'SELECT * FROM reservations WHERE id_users=$1'
    const result = await this._instance.query(query, [Number(userId)])
    return result
  }
}
