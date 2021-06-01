import { Command } from '..'
import embed from '../utils/embed'
import { getCommands } from '../utils/readDirectory'
import { sendMessage } from '../utils/sendMessage'

const helpCommand: Command = {
  name: 'help',
  description: 'Obtenga este mensaje de ayuda',
  category: 'general',
  async setup(_client, message) {
    const commands = await getCommands()
    let description = ''

    for (const command in commands) {
      description += `__**${commands[command].name}**__\n\t**Descripción**: ${commands[command].description}\n\t**Categoría**: \`${commands[command].category}\`\n\n`
    }

    const res = embed({
      title: 'Commandos',
      description,
      color: 0x3498db
    })

    sendMessage(message.channel, res)
  }
}

export default helpCommand
