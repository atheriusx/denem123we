const discord = require('discord.js')
const axios = require("axios")
const users = require('../../models/users.js');
const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2();
async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  name: "jointoken",
  description: "jointoken",
  default_permission: true,
  options: [{
    name: 'token',
    type: 'STRING',
    description: "jointoken",
    required: true,
  },
  ],
  category: "whitelist",
  userPerms: ["SEND_MESSAGES"],
  ownerOnly: false,

  run: async (client, interaction, args) => {

    const token = interaction.options.getString('token');
    
try {
     await axios.get('https://discord.com/api/users/@me', { headers: { 'Authorization': `Bearer ${token}` } }).then(async (te) => {

  let kullanici = await users.findOne({ userId: te.data.id })
        
  await oauth.addMember({ guildId: interaction.guildId, botToken: process.env.token, userId: kullanici.userId, accessToken: kullanici.accessToken })

await interaction.reply({embeds:[new discord.MessageEmbed().setDescription(`<@!${te.data.id}> adli kullanciyi ${interaction.guild.name} adli sunucuya ekledim.`)], ephemeral:true})
console.log(`✔️ ${kullanici.username}`)
      })
} catch {await interaction.reply({embeds:[new discord.MessageEmbed().setDescription(`Üyeyi sunucuya eklerken bir hata olustu.`)], ephemeral:true})}
  }
}