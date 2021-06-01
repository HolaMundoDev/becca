import { Client } from 'discord.js'
import logger from '../utils/logger'

export default function onReady(client: Client): void {
  logger.info(`Logged as ${client.user?.tag}`)
  client.user?.setActivity({ type: 'WATCHING', name: 'HolaMundo en Youtube' })
  client.user?.setUsername('HolaMundo Evil')
}
