const discord = require('discord.js')
const users = require('../../models/users');
async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
module.exports = {
  name: "joinall",
  description: "Tüm kullanıcıları sunucuya girdirir.",
  options: [{
    name: 'time',
    description: "Kullanıcı başına bekleme süresi (milisaniye).",
    type: "INTEGER",
    required: false
  }],
  default_permission: true,
  category: "whitelist",
  userPerms: ["SEND_MESSAGES"],
  ownerOnly: false,

  run: async (client, interaction, args) => {
    let time = interaction.options.getInteger("time")
    // const row = new discord.MessageActionRow().addComponents(new discord.MessageButton().setLabel("Stop").setStyle("DANGER").setCustomId("stop"))
    const data = await users.find();
    let error = 0;
    let success = 0;
    let already_joined = 0;
interaction.reply({content: "Process started."})
    let msg = await interaction.channel.send(`**Users...** \`0\`/\`${data.length}\``)
    const inter = setInterval(async () => {
      msg.edit(`**Users...** \`${success}\`/\`${data.length}\``)
    }, 1000)

    for (const i of data) {


      time ? await sleep(time) : ""
      const user = await client.users.fetch(i.userId).catch(() => { });
      if (interaction.guild.members.cache.get(i.userId)) {
        already_joined++
        console.log(`✔️ ${i.username}`)
      } else {
        await interaction.guild.members.add(user, { accessToken: i.accessToken }).catch(() => {
          error++
          console.log(`❌ ${i.username}`)
        })
        success++
        console.log(`✔️ ${i.username}`)
      }
    }
    await clearInterval(inter)
    await interaction.channel.send({
      content: 'Done! ', embeds: [{
        title: `${client.user.username} > Joinall`,
        description: `\n**Joined**: ${success}`,
        color: "2F3136"
      }]
    })
  }
}//`**Member already on the server**: ${already_joined
//\n**Error**: ${error}