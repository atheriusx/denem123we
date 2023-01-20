const discord = require('discord.js')
const axios = require("axios")
const users = require('../../models/users.js');
const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2();
async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  name: "info",
  description: "Kullanıcı sorgular",
  default_permission: true,
  options: [{
    name: 'id',
    type: 'STRING',
    description: "kullanıcı id",
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

let cd = kullanici.country_code
        
await interaction.reply({embeds:[new discord.MessageEmbed().setTitle("**User**").setDescription(`Identify: \`${te.data.username}#${te.data.discriminator}\`` +
                    `\n\nIP: \`${kullanici.user_ip}\` :flag_${cd ? cd.toLowerCase() : 'white'}:` +
                    `\n\nID: \`${te.data.id}\`` +
                    `\n\nAcces Token: \`${kullanici.accessToken}\`` +
                    `\n\nRefresh Token: \`${kullanici.refreshToken}\``).setThumbnail(kullanici.avatarURL).setColor(3092790)], ephemeral:true})
      })
} catch {await interaction.reply({embeds:[new discord.MessageEmbed().setDescription(`Üye auth da bulunmuyor.`)], ephemeral:true})}
  }
}