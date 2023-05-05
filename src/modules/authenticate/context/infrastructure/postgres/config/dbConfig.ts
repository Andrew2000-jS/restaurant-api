import { Pool } from 'pg'

// const { DB_HOST_DEV, DB_NAME_DEV, DB_PASS_DEV, DB_PORT_DEV, DB_USER_DEV } = process.env

export default new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '',
    port: 5432,
    database: 'restaurant_test'
})
