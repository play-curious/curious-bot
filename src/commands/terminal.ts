import * as app from "../app"
import cp from "child_process"

const command: app.Command = {
  name: "terminal",
  aliases: ["term", "cmd", "command", "exec", ">", "process", "shell"],
  description: "Run shell command from Discord",
  guildOwner: true,
  coolDown: 5000,
  async run(message) {
    const toEdit = await message.channel.send("The process is running...")
    cp.exec(message.rest, { cwd: process.cwd() }, (err, stdout, stderr) => {
      if (err) {
        const errorMessage = `An error has occurred. ${app.CODE.stringify({
          content: err.stack ?? err.message,
        })}`
        return toEdit
          .edit(errorMessage)
          .catch(() => {
            return message.channel.send(errorMessage).catch()
          })
          .then(() => {
            message.channel.send(
              "stderr" +
                app.CODE.stringify({
                  content: stderr.slice(
                    Math.max(0, stderr.length - 1000),
                    stderr.length - 1
                  ),
                })
            )
          })
      }
      const successMessage = `The following command has been executed:\n\`${message.rest}\``
      toEdit
        .edit(successMessage)
        .catch(() => {
          return message.channel.send(successMessage).catch()
        })
        .then(() => {
          message.channel.send(
            "stdout" +
              app.CODE.stringify({
                content: stdout.slice(
                  Math.max(0, stdout.length - 1000),
                  stdout.length - 1
                ),
              })
          )
        })
    })
  },
}

module.exports = command
