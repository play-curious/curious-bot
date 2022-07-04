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
  flags: [
    {
      name: "with-team",
      aliases: ["team"],
      flag: "t",
      description: "With PlayCurious Team",
    },
  ],
  async run(message) {
    const vocal: app.VoiceChannel = message.args.vocal

    if (!vocal.isVoice()) return message.send(`No voice channel targeted`)

    function membersOf(list: string[]) {
      return list.map((resolvable) => {
        const match = /(\d+)/.exec(resolvable)
        return match ? message.guild.members.cache.get(match[1]) : null
      })
    }

    return message.send(
      [
        ...vocal.members.values(),
        ...membersOf(message.args.with),
        ...membersOf(
          message.args.team
            ? (
                await message.guild.roles.fetch("619438748459073557")
              )?.members.map((m) => m.id) ?? []
            : []
        ),
      ]
        .sort(() => Math.random() - 0.5)
        .map((e, i) => String(i + 1) + " " + e?.displayName)
        .join("\n") || "No member found in " + vocal.name + " channel."
    )
  },
})
