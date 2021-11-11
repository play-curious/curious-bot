import * as app from "../app.js"

const listener: app.Listener<"messageCreate"> = {
  event: "messageCreate",
  description: "A messageCreate listener",
  async run(message) {
    // generate branch link
    if (message.webhookId && message.channel.id === "714823316531183656") {
      const embed = message.embeds[0]
      if (embed && embed.title?.includes("new commit")) {
        const result = /\[.+:(.+)]/.exec(embed.title)
        if (result) {
          const [, branch] = result
          app.onceMessage(message.channel, () => {
            message.channel.send({
              embeds: [
                new app.SafeMessageEmbed()
                  .setColor()
                  .setTitle(`"${branch}" branch of Crispr Crunch is deployed!`)
                  .setDescription(
                    `Check the [player](https://playcurious.games/games/crispr-crunch-branches/${branch}) version or the [developer](https://playcurious.games/games/crispr-crunch-branches/${branch}/?debug) version.`
                  ),
              ],
            })
          })
          return
        }
      }
    }
  },
}

export default listener
