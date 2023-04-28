import { Pool } from 'pg'
import config from './config'

export class PostgresSingletonDB {
    private static instance: PostgresSingletonDB
    private readonly _pool: Pool

    private constructor () {
        this._pool = config
    }

    public static getInstance(): PostgresSingletonDB {
        if (!PostgresSingletonDB.instance) {
            PostgresSingletonDB.instance = new PostgresSingletonDB()
        }

        return PostgresSingletonDB.instance
    }

    public async query(query: string, params?: any[], connection?: any): Promise<any> {
        const client = connection || await this._pool.connect()
        try {
            const result = await client.query(query, params)
            return result.rows
        } finally {
            if (!connection) {
                client.release()
            }
        }
    }
}
