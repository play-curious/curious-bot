import * as app from "../app.js"

export default new app.Command({
  name: "standup",
  aliases: ["su", "order", "sort", "stand-up"],
  description: "The stand-up command",
  channelType: "guild",
  positional: [
    {
      name: "vocal",
      description: "Voice channel to target",
      default: "697707821848068096",
      castValue: "channel+",
    },
  ],
  options: [
    {
      name: "with",
      aliases: ["include", "includes", "users", "members", "and"],
      description: "Implicit members",
      castValue: "array",
    },
  ],
  async run(message) {
    const vocal: app.VoiceChannel = message.args.vocal

    if (!vocal.isVoice()) return message.send(`No voice channel targeted`)

    return message.send(
      [
        ...vocal.members.values(),
        ...message.args.with.map((resolvable: string) => {
          const match = /(\d+)/.exec(resolvable)
          return match ? message.guild.members.cache.get(match[1]) : null
        }),
      ]
        .sort(() => Math.random() - 0.5)
        .map((e, i) => String(i + 1) + " " + e.displayName)
        .join("\n") || "No member found in " + vocal.name + " channel."
    )
  },
})
