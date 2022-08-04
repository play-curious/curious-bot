import * as app from "../app.js"

export default new app.Command({
  name: "standup",
  aliases: ["su", "order", "sort", "stand-up"],
  description: "The stand-up command",
  channelType: "guild",
  options: [
    {
      name: "with",
      aliases: ["include", "includes", "users", "members", "and"],
      description: "Implicit members",
      castValue: "array",
    },
    {
      name: "vocal",
      aliases: ["channel", "salon", "chan", "voc"],
      description: "Voice channel to target",
      default: "697707821848068096",
      castValue: "channel",
    },
  ],
  async run(message) {
    if (message.args.with.length > 0)
      return message.send({
        embeds: [
          new app.MessageEmbed()
            .setTitle("Please use the following command instead")
            .setDescription(
              `${message.usedPrefix}standup ${message.args.with.join(" ")}`
            ),
        ],
      })

    const vocal: app.VoiceChannel = message.args.vocal

    if (!vocal.isVoice()) return message.send(`No voice channel targeted`)

    return message.send(
      [
        ...vocal.members.values(),
        ...(message.mentions?.members?.values() ?? []),
      ]
        .sort(() => Math.random() - 0.5)
        .map((e, i) => String(i + 1) + " " + e?.displayName)
        .join("\n") || "No member found in " + vocal.name + " channel."
    )
  },
})
