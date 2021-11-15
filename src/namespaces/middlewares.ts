import * as app from "../app.js"

export const adminOnly: app.Middleware<"dm" | "guild" | "all"> = (
  message,
  data
) => {
  return {
    data,
    result:
      message.author.id === process.env.BOT_OWNER ||
      message.author.id === "154182248826929152" ||
      "You must be a bot admin.",
  }
}
