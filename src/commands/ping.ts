import { Command } from '..'
import embed from '../utils/embed'
import { sendMessage } from '../utils/sendMessage'

const pingCommand: Command = {
  name: 'ping',
  description: 'Obtenga la latencia del bot y el de la api de discord',
  category: 'general',
  async setup(client, message) {
    sendMessage(
      message.channel,
      embed({
        title: 'Pong!',
        description: `🏓 La latencia es de ${
          Date.now() - message.createdTimestamp
        }ms. La latencia de la API es de ${Math.round(client.ws.ping)}ms`,
        color: 'RANDOM'
      })
    )
  }
}

export default pingCommand
