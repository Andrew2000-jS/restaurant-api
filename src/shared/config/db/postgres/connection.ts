import { Pool } from 'pg'
import dbConfig from './dbConfig'
import { PgException } from './exception'

export class PostgresDB {
  private static instance: PostgresDB
  private readonly pool: Pool

  private constructor() {
    this.pool = dbConfig
  }

  public static getInstance(): PostgresDB {
    if (!PostgresDB.instance) {
      PostgresDB.instance = new PostgresDB()
    }

    return PostgresDB.instance
  }

  public async query(text: string, params?: any[]): Promise<any> {
    try {
        const response = await this.pool.query(text, params)
        return response.rows[0]
    } catch (error: any) {
      console.log(error.message)
      throw new PgException()
    }
  }
}
