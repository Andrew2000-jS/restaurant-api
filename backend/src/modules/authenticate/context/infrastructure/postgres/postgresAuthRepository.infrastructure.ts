import { AuthRepository, User } from '../../domain'
import { CommonQueries, PostgresDB } from '../../../../../shared'

export class PostgresAuthRepository implements AuthRepository {
  private readonly _instance: PostgresDB

  constructor() {
    this._instance = PostgresDB.getInstance()
  }

  async login(ci: number, password: string): Promise<User> {
    const query = 'SELECT * FROM users WHERE ci=$1 AND password=$2'
    const result: User = await this._instance.query(query, [ci, password])
    return result
  }

  async signup(user: User): Promise<User> {
    const { name, lastname, email, phone, address, password, ci, birthdate } = user
    const values = [
      name._value,
      lastname._value,
      email._value,
      phone._value,
      address._value,
      password,
      ci._value,
      birthdate
    ]
    const columns = [
      'name',
      'lastName',
      'email',
      'phone',
      'address',
      'password',
      'ci',
      'birthdate'
    ]

    const query = CommonQueries.insert('users', columns, values)
    const result = await this._instance.query(query, values)
    return result
  }

  async update(id: string, data: User): Promise<User | undefined> {
    const query = await this._instance.query(
      'UPDATE users SET ci=$1, name=$2, lastName=$3, email=$4, phone=$5, address=$6, birthdate=$7, password=$8 WHERE id=$9',
      [
        data.ci._value,
        data.name._value,
        data.lastname._value,
        data.email._value,
        data.phone._value,
        data.address._value,
        data.birthdate,
        data.password,
        Number(id)
      ]
    )
    return query
  }

  async delete(id: string): Promise<void> {
    const query = CommonQueries.delete('users', 'id')
    const req = await this._instance.query(query, [Number(id)])
    return req
  }

  async findByCi(ci: number): Promise<User | undefined> {
    const query = await this._instance.query(
      'SELECT * FROM users WHERE ci=$1',
      [ci]
    )
    return query
  }

  async findById(id: string): Promise<User | undefined> {
    const query: User = await this._instance.query(
      'SELECT * FROM users WHERE id=$1',
      [Number(id)]
    )
    return query
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const query: User = await this._instance.query(
      'SELECT * FROM users WHERE email=$1', [email]
    )

    return query
  }

  async findByPhone(phone: string): Promise<User | undefined> {
    const query: User = await this._instance.query(
      'SELECT * FROM users WHERE phone=$1', [phone]
    )

    return query
  }

  async findAll(): Promise<User[]> {
    const query = CommonQueries.findAll('users')
    const req: User[] = await this._instance.query(query)
    return req
  }
}
