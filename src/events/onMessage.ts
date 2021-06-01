import { Client, Message } from 'discord.js'
import { getCommands } from '../utils/readDirectory'

export default async function onMessage(
  client: Client,
  message: Message
): Promise<void> {
  if (!message.content.startsWith(process.env.BOT_PREFIX || '!')) return

  if (message.author.id === client.user?.id) return

  const commands = await getCommands()
  const commandName = message.content.split(' ').shift()?.toLowerCase()

  for (const command in commands) {
    if (
      commands[command].name ===
      commandName?.replace(process.env.BOT_PREFIX || '!', '')
    ) {
      commands[command].setup(client, message)
      return
    }
  }
}
