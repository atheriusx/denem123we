const discord = require('discord.js')
const users = require('../../models/users');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
  name: "nuke",
  description: "nuke atar",
  default_permission: true,
  timeout: 3000,
  category: "whitelist",
  userPerms: ["SEND_MESSAGES"],
  ownerOnly: true,

  run: async (client, int, args) => {

await int.reply({embeds:[new discord.MessageEmbed().setDescription(`${int.channel} kanalina nuke atiyorum...`)], ephemeral:true})

await int.channel.clone().then(async() => {
 await int.channel.delete()   
})

  }
}