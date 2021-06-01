import { ColorResolvable, MessageEmbed } from 'discord.js'

interface EmbedProps {
  title?: string
  description?: string
  image?: string
  url?: string
  color?: ColorResolvable
  timestamp?: number | Date
}

export default function embed(props?: EmbedProps): MessageEmbed {
  const embed = new MessageEmbed()

  // Title
  props?.title && embed.setTitle(props?.title)

  // Description
  props?.description && embed.setDescription(props?.description)

  // Image
  props?.image && embed.setImage(props?.image)

  // Url
  props?.url && embed.setURL(props?.url)

  // Colors
  props?.color ? embed.setColor(props?.color) : embed.setColor('RANDOM')

  // Timestamp
  props?.timestamp
    ? embed.setTimestamp(props?.timestamp)
    : embed.setTimestamp(Date.now())

  // Return embed
  return embed
}
