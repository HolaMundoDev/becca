import { Command } from '..'
import embed from '../utils/embed'
import { sendMessage } from '../utils/sendMessage'

const avatarCommand: Command = {
  name: 'avatar',
  description: 'Obtenga su avatar o el de otro usuario',
  category: 'general',
  async setup(_client, message) {
    const mention = message.mentions.members?.first()
    const res = embed({
      title: 'Avatar',
      description: mention
        ? `¡<@${message.author.id}>, Este es el avatar del usuario <@${mention.id}>!`
        : `¡<@${message.author.id}>, Este es su avatar!`,
      image: mention
        ? mention.user.displayAvatarURL({ dynamic: true, size: 1024 })
        : message.author.displayAvatarURL({ dynamic: true, size: 1024 })
    })

    sendMessage(message.channel, res)
  }
}

export default avatarCommand
