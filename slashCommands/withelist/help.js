const discord = require('discord.js')
const users = require('../../models/users');
const kaladin = require("../../kaladin")

module.exports = {
  name: "commands",
  description: "Komutları listeler",
  default_permission: true,
  category: "whitelist",
  userPerms: ["SEND_MESSAGES"],
  ownerOnly: false,

  run: async (client, interaction, args) => {
    const embed = new discord.MessageEmbed()
    .setTitle(`${client.user.username} > Help Commands`)
    .addFields(
    {name: '> /Users', value: 'Total member count', inline: true},
    {name: '> /greet', value: 'config greet', inline: true},
    {name: '> /Joinall', value: 'Join all the members', inline: true},
    {name: '> /Join [Montant]', value: 'Join the members with selected amount', inline: true},
    {name: '> /Refresh', value: 'Refresh DB (owner)', inline: true},
    {name: '> /Clean', value: 'Clean DB (owner)', inline: true},
    {name: '> /wl [add/remove/list]', value: 'Whitelist ', inline: true},
    {name: '> /Leave', value: 'Leave from server', inline: true},
    {name: '> /Links', value: 'Links Bot/Oauth', inline: true},
    {name: '> /Giveaway', value: 'Verify Giveaway', inline: true},
    {name: '> /Nsfw', value: 'Verify NSFW', inline: true},
    {name: '> /Help', value: 'commands', inline: true},)
    .setFooter({ text: ' slashCommands'})
    .setColor('BLUE')
.setImage('https://cdn.discordapp.com/attachments/1049728142908080219/1051202604249649152/image.png')
    await interaction.reply({embeds: [embed]})
  }
}