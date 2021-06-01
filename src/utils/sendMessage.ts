import { TextChannel, DMChannel, NewsChannel, MessageEmbed } from 'discord.js'

async function sleep(time: number): Promise<void> {
  new Promise((resolve) => {
    setTimeout(() => resolve(time), time)
  })
}

async function sendMessage(
  channel: TextChannel | DMChannel | NewsChannel,
  content: string | MessageEmbed,
  miliseconds = 100
): Promise<void> {
  channel.startTyping()
  await sleep(miliseconds)
  channel.stopTyping()
  await channel.send(content)
}

export { sleep, sendMessage }
