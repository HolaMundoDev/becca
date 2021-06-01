import { Client, Message, MessageReaction, PartialUser, User } from 'discord.js'
import onMessage from './events/onMessage'
import onMessageReactionAdd from './events/onMessageReactionAdd'
import onReady from './events/onReady'
import logger from './utils/logger'

export interface Command {
  name: string
  description: string
  category: 'general' | 'moderations'
  setup(client: Client, message: Message): Promise<void>
}

/**
 * @async
 * @function
 */
async function init(): Promise<void> {
  // Get enviroments variables from .env file with dotenv if NODE_ENV is production
  if (process.env.NODE_ENV !== 'production') {
    ;(await import('dotenv')).config()
    logger.debug('Load enviroment variables')
  }

  // Create discord client
  const client = new Client()

  // Events
  client.on('ready', () => onReady(client))
  client.on('message', (message: Message) => onMessage(client, message))
  client.on(
    'messageReactionAdd',
    (reaction: MessageReaction, user: User | PartialUser) =>
      onMessageReactionAdd(client, reaction, user)
  )

  // Login client
  client.login(process.env.BOT_TOKEN)
}

// Burn baby Burn
init()
