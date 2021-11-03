require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });


const prefix = '!'
const cook = 'Cooking'
const garden = 'Gardening'
const announcements = '889222322819567716'

let meetings = {
    section: new String,
    week: 0,
    time: '6PM',
    location: 'Science Center 121'
}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}.`)
})

client.on("messageCreate", async(msg) => {
    let weekly
    if (!msg.content.startsWith(prefix)) return;
    
    const args = msg.content.trim().split(/ +/g)
    const cmd = args[0].slice(prefix.length).toLowerCase()
    if(cmd === 'start') {
        console.log('Starting...')
        weekly = setInterval( () => {
            if(meetings.week === 0) {
                meetings.section = cook
                meetings.week++
            }
            else {
                meetings.section = garden
                meetings.week--
            }
            client.channels.cache
            .get(announcements)
            .send(`@here Meeting today! ${meetings.section} section is meeting at ${meetings.time} in ${meetings.location}!`)
        }, 5000)
    }
})

client.on('error', error => {
    console.error(`This error occured: ${error}`)
})

client.login(process.env.BOT_TOKEN)