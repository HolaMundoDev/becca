import {
  Client,
  MessageReaction,
  PartialUser,
  TextChannel,
  User
} from 'discord.js'
import embed from '../utils/embed'
import logger from '../utils/logger'
import { sendMessage } from '../utils/sendMessage'

export default function onMessageReactionAdd(
  client: Client,
  reaction: MessageReaction,
  user: User | PartialUser
): void {
  if (reaction.emoji.name === 'report') {
    const channel = client.channels.cache.get('826899990105686026')
    if (
      !((channel): channel is TextChannel => channel?.type === 'text')(channel)
    ) {
      return
    }

    const res = embed({
      title: 'Se ha reportado un mensage',
      description: `El usuario <@${
        user.id
      }> ha reportado un mensaje del usuario <@${
        reaction.message.author.id
      }> en el canal <#${
        reaction.message.channel.id
      }> con el siguiente contenido:\n\n> ${
        reaction.message.content || '*El mensaje no tiene un contenido valido*'
      }`,
      url: reaction.message.url,
      color: 0xe74c3c
    })

    if ((reaction.count as number) >= 5) {
      sendMessage(channel, '<@&789593087293784115>')
    }
    sendMessage(channel, res)
    reaction.remove()

    logger.info(
      `El usuario <@${user.id}> ha reportado un mensaje del usuario <@${reaction.message.author.id}> en el canal <#${reaction.message.channel.id}>`
    )
  }
}
