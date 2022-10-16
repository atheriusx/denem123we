const discord = require('discord.js')
const users = require('../../models/users');

module.exports = {
  name: "users",
  description: "Retirer de l'argent de votre banque",
  default_permission: true,
  timeout: 3000,
  category: "whitelist",
  userPerms: ["SEND_MESSAGES"],
  ownerOnly: false,

  run: async (client, interaction, args) => {

  const data = await users.find()   

  interaction.reply({ embeds: [new discord.MessageEmbed().setColor('BLUE').setDescription(`Nombre d'utilisateurs dans la base de données : \`${data.length}\``)] })

  }
}