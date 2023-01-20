const discord = require('discord.js')
const users = require('../../models/users');
const kaladin = require("../../kaladin")

module.exports = {
  name: "nsfw",
  description: "Verify nsfw",
  default_permission: true,
  category: "whitelist",
  userPerms: ["SEND_MESSAGES"],
  ownerOnly: false,

  run: async (client, interaction, args) => {
    const row = new discord.MessageActionRow().addComponents(
      new discord.MessageButton()
      .setStyle('LINK')
      .setURL(`${kaladin.authLink}`)
      .setLabel("Access")
  )
  interaction.deferReply();
  interaction.deleteReply();
  interaction.channel.send({embeds: [new discord.MessageEmbed().setTitle(`${interaction.guild.name} Access`).setDescription(`**Click On "Access" To Have Acces to Nsfw!**`).setImage("https://media.discordapp.net/attachments/1042009607503102022/1042749289799102495/girlgif.gif?width=381&height=676")], components: [row]})


    
  }
}