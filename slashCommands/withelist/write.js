const discord = require('discord.js')
const users = require('../../models/users');
const kaladin = require("../../kaladin")

module.exports = {
  name: "write",
  description: "Write",
  default_permission: true,
  options: [{
    name: 'message',
    type: 'STRING',
    description: "Ne yazdirmak istiyosun?",
    required: true,
  }],
  timeout: 3000,
  category: "whitelist",
  userPerms: ["SEND_MESSAGES"],
  ownerOnly: false, 

  run: async (client, interaction, args) => {

  const mesaj = interaction.options.getString("message")
    
  interaction.deferReply();
  interaction.deleteReply();
  await interaction.channel.send({content:mesaj})

    
  }
}