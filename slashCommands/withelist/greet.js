const discord = require('discord.js')
const users = require('../../models/users');
const { QuickDB } = require("quick.db")
const db = new QuickDB()
async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  name: "greet",
  description: "Greet ayarlar.",
  default_permission: true,
  options: [{
    name: 'kanal',
    type: 'CHANNEL',
    channelTypes: ["GUILD_TEXT","GUILD_NEWS"],
    description: "Kaç kişiyi sunucuya girdirmek istiyorsun ?",
    required: true,
  }, {
    name: 'mesaj',
    description: "Kullanıcı başına bekleme süresi.",
    type: "STRING",
    required: false
  }, {
    name: 'süre',
    description: "Kullanıcı başına bekleme süresi.",
    type: "NUMBER",
    required: false
  },
  ],
  category: "whitelist",
  userPerms: ["SEND_MESSAGES"],
  ownerOnly: false,

  run: async (client, int, args) => {

let kanal = int.options.getChannel("kanal")
let mesaj = int.options.getString("mesaj")
let sil = int.options.getNumber("süre")
let açkpa = await db.get(`açkpa_${kanal.id}`)

if (kanal && !açkpa) {

await db.set(`açkpa_${kanal.id}`, "Açik")

if (sil) {
  await db.set("silmesaj", sil * 1000)
}
  
if (!mesaj) {
await db.push("kanallar", kanal.id)
    
await int.reply({embeds:[new discord.MessageEmbed().setDescription(`${kanal} kanalini basariyla greete ekledim.`)], ephemeral:true})
} else if (mesaj) {
await db.set("mesaj", mesaj)
await db.push("kanallar", kanal.id)
    
await int.reply({embeds:[new discord.MessageEmbed().setDescription(`${kanal} kanalini basariyla greete ekledim.`)], ephemeral:true})
}
} else if (kanal && açkpa === "Açik") {

await db.delete(`açkpa_${kanal.id}`)

if (sil) {
  await db.set("silmesaj", sil * 1000)
}

if (!mesaj) {
await db.delete("kanallar", kanal.id)                   
    
await int.reply({embeds:[new discord.MessageEmbed().setDescription(`${kanal} kanalini basariyla greetden çikardim.`)], ephemeral:true})
} else if (mesaj) {
await db.set("mesaj", mesaj)
await db.delete("kanallar", kanal.id)                   
    
await int.reply({embeds:[new discord.MessageEmbed().setDescription(`${kanal} kanalini basariyla greetden çikardim.`)], ephemeral:true})
}
}
  }
}