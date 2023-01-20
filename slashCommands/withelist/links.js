const discord = require('discord.js')
const users = require('../../models/users');
const kaladin = require("../../kaladin")

module.exports = {
  name: "links",
  description: "Botun linklerini gönderir",
  default_permission: true,
  timeout: 3000,
  category: "whitelist",
  userPerms: ["SEND_MESSAGES"],
  ownerOnly: false,

  run: async (client, interaction, args) => {

   let butonlar = new discord.MessageActionRow().addComponents(new discord.MessageButton().setLabel("Auth Link").setStyle("LINK").setURL(kaladin.authLink), new discord.MessageButton().setLabel("Invite Link").setStyle("LINK").setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`))
    
   await interaction.reply({embeds:[new discord.MessageEmbed().setTitle(`Linkleri DM den gönderdim!`)], ephemeral:true})

   await interaction.member.send({embeds:[new discord.MessageEmbed().setTitle(`${client.user.username} > Oauth/Invite`).setDescription(`**Link Oauth2:** ${kaladin.authLink}\n \`\`\`${kaladin.authLink}\`\`\`\n**Bot Invite:** https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands\n\`\`\`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands\`\`\``)], components:[butonlar]})
  }
}