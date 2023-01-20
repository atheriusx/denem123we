const discord = require('discord.js')
const axios = require("axios")
const users = require('../../models/users.js');
const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2();
async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  name: "ping",
  description: "Ping",
  default_permission: true,
  category: "whitelist",
  userPerms: ["SEND_MESSAGES"],
  ownerOnly: false,

  run: async (client, int, args) => {

await int.reply({embeds:[new discord.MessageEmbed().setDescription(`**Pingim:** ${client.ws.ping}**ms**`)], ephemeral:true})

  }
}