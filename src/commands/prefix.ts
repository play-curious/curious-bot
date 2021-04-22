import * as app from "../app"
import guilds from "../tables/guilds"

const command: app.Command<app.GuildMessage> = {
  name: "prefix",
  guildOwnerOnly: true,
  guildChannelOnly: true,
  description: "Edit or show the bot prefix",
  positional: [
    {
      name: "prefix",
      checkValue: (value) => value.length < 10 && /^\S/.test(value),
      description: "The new prefix",
    },
  ],
  async run(message) {
    const prefix = message.args.prefix

    if (!prefix)
      return message.channel.send(
        `My current prefix for "**${message.guild}**" is \`${await app.prefix(
          message.guild
        )}\``
      )

    await guilds.query
      .insert({
        id: message.guild.id,
        prefix: prefix,
      })
      .onConflict("id")
      .merge()

    await message.channel.send(
      `My new prefix for "**${message.guild}**" is \`${prefix}\``
    )
  },
}

module.exports = command
