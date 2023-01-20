const discord = require('discord.js')
const axios = require("axios")
const users = require('../../models/users.js');
const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2();
async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  name: "joinid",
  description: "Girilen sayıda kullanıcıyı sunucuya çeker",
  default_permission: true,
  options: [{
    name: 'id',
    type: 'STRING',
    description: "Kaç kişiyi sunucuya girdirmek istiyorsun ?",
    required: true,
  },
  ],
  category: "whitelist",
  userPerms: ["SEND_MESSAGES"],
  ownerOnly: false,

  run: async (client, interaction, args) => {

    const token = interaction.options.getString('id');
    
try {
  let kullanici = await users.findOne({ userId: token })
  
     await axios.get('https://discord.com/api/users/@me', { headers: { 'Authorization': `Bearer ${kullanici.accessToken}` } }).then(async (te) => {
        
  await oauth.addMember({ guildId: interaction.guildId, botToken: process.env.token, userId: kullanici.userId, accessToken: kullanici.accessToken })

await interaction.reply({embeds:[new discord.MessageEmbed().setDescription(`<@!${te.data.id}> adli kullanciyi ${interaction.guild.name} adli sunucuya ekledim.`)], ephemeral:true})
console.log(`✔️ ${kullanici.username}`)
      })
} catch {await interaction.reply({embeds:[new discord.MessageEmbed().setDescription(`Üyeyi sunucuya eklerken bir hata olustu.`)], ephemeral:true})}
  }
}