import { Server } from './server'
import { config } from 'dotenv'

config({ path: '.env.local' })

const server = new Server(8080)

async function main(): Promise<void> {
    await server.listen()
}

void main()
