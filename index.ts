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
    let weekly = setInterval( () => {
        if(meetings.week % 2 === 0) meetings.section = cook
        else meetings.section = garden
        client.channels.cache
        .get(announcements)
        .send(`Meeting today! ${meetings.section} is meeting at ${meetings.time} in ${meetings.location}!`)
        meetings.week++
    }, 604800000)
    
    if (!msg.content.startsWith(prefix)) return;
    
    const args = msg.content.trim().split(/ +/g)
    const cmd = args[0].slice(prefix.length).toLowerCase()
    if(cmd === 'start') {
        console.log('Starting...')
        async () => weekly
    }
})

client.on('error', error => {
    console.error(`This error occured: ${error}`)
})

client.login(process.env.BOT_TOKEN)