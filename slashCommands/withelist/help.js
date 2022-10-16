const discord = require('discord.js')
const users = require('../../models/users');
const kaladin = require("../../kaladin")

module.exports = {
  name: "help",
  description: "Vous affiche la liste des commandes",
  default_permission: true,
  timeout: 3000,
  category: "whitelist",
  userPerms: ["SEND_MESSAGES"],
  ownerOnly: false,

  run: async (client, interaction, args) => {
    const embed = new discord.MessageEmbed()
    .setTitle(`${client.user.username} > Help Commands`)
    .addFields(
      {name: '> /Users', value: 'Voir le total des membres', inline: true},
    {name: '> /Joinall', value: 'Ramène tous les membres sur le serveur', inline: true},
    {name: '> /Join [Montant]', value: 'Ramène un montant spécific sur le serveur', inline: true},
    {name: '> /Refresh', value: 'Refresh la DB (owner)', inline: true},
    {name: '> /Clean', value: 'Clean la DB (owner)', inline: true},
      {name: '> /wl [add/remove/list]', value: 'Ajoutez, supprimez, voir la list de la whitelist', inline: true},
    {name: '> /Leave', value: 'Quitte un serveur', inline: true},
    {name: '> /Links', value: 'Liens Bot/Oauth', inline: true},
    {name: '> /Giveaway', value: 'Vérification Giveaway', inline: true},
    {name: '> /Nsfw', value: 'Vérification NSFW', inline: true},
    {name: '> /Help', value: 'Voir la liste des commandes', inline: true},)
    .setFooter({ text: 'Fonctionne avec slashCommands'})
    await interaction.reply({embeds: [embed]})
  }
}