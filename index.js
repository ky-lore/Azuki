require('dotenv').config()
const express = require('express')
const { join } = require('path')
const Discord = require('discord.js');
const bot = new Discord.Client()
const TOKEN = process.env.TOKEN
const app = express()

app.use(express.json())
app.use(require('./routes'))

require('./db')
.then(() => app.listen(process.env.PORT || 80))
.catch(err => console.log(err))

bot.commands = new Discord.Collection()
const botcmd = require('./commands')
bot.login(TOKEN);

Object.keys(botcmd).map(key => {
  bot.commands.set(botcmd[key].name, botcmd[key])
})

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`)
});

bot.on('message', msg => {
  if (msg.content[0] === "%") {
    const args = msg.content.split(/ +/)
    const command = args.shift().toLowerCase()
    console.info(`${msg.author.username}#${msg.author.discriminator} called command: ${command}`)

    if (!bot.commands.has(command)) return

    try {
      bot.commands.get(command).execute(msg, args)
    } catch (error) {
      console.error(error)
      msg.reply('there was an error trying to execute that command!')
    }
  }
});