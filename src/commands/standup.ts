import * as app from "../app.js"

export default new app.Command({
  name: "standup",
  aliases: ["su", "order", "sort", "stand-up"],
  description: "The stand-up command",
  channelType: "all",
  positional: [
    {
      name: "vocal",
      description: "Voice channel to target",
      default: "697707821848068096",
      castValue: "channel+",
    },
  ],
  async run(message) {
    const vocal: app.VoiceChannel = message.args.channel

    return message.send(
      Array.from(vocal.members.values())
        .sort((a, b) => Math.random() - 0.5)
        .map((e, i) => String(i + 1) + " " + e.displayName)
        .join("\n") || "No member found in " + vocal.name + " channel."
    )
  },
})
