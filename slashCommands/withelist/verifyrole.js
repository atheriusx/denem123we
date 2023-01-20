const discord = require('discord.js')
const users = require('../../models/users');
const kaladin = require("../../kaladin")

module.exports = {
  name: "verify",
  description: "Verify Role",
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
        .setEmoji("<:1029920912373448805:1061016986194284616>")
    )
    interaction.deferReply();
    interaction.deleteReply();
    interaction.channel.send({
      embeds: [new discord.MessageEmbed()
        .setColor("BLUE").setTitle(`${interaction.guild.name} Access <:1029920912373448805:1061016986194284616>`).setDescription(`**Click On "Access" To Have Acces to Discord Verify Role! <:bannerstory_discordd:1061017380802805792>**`).setImage("https://cdn.discordapp.com/attachments/1058455892783288403/1061013451264229398/discord-icon-start-up-f41wavy07pz2w3qk.gif")], components: [row]
    })



  }
}