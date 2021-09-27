//Base code used from https://www.wikihow.com/Create-a-Bot-in-Discord
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

var meetings = {
    section: new String,
    week: 0,
    date: new Date(),
    cook: "Cooking",
    garden: "Gardening",
    day: "Thursday",
    time: "6PM",
    location: "EH100"
}

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    if (message.substring(0, 1) == '!' && userID == 223248267650007041 && channelID == 889222322819567716) {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);
        switch(cmd) {
            case 'loc':
                meetings.location = message.substring(5);
                bot.sendMessage({
                    to: channelID,
                    message: ("Location set to: " + meetings.location)
                });
                console.log(meetings.location);
            break;
            case 'time':
                meetings.time = message.substring(6);
                bot.sendMessage({
                    to: channelID,
                    message: ("Time set to: " + meetings.time)
                });
                console.log(meetings.time);
            break;
            case 'day':
                meetings.day = message.substring(5);
                bot.sendMessage({
                    to: channelID,
                    message: ("Day set to: " + meetings.day)
                });
                console.log(meetings.day);
            break;
         }
     }
});

bot.on('meetings', function() { 
    while(true) {
        console.log("Looped...");
        if(meetings.date.getDay() == 1) {
            if (meetings.week % 2 == 0) {
                meetings.section = meetings.cook;
                meetings.week++;
                console.log(meetings.week);
            } else {
                meetings.section = meetings.garden;
                meetings.week++;
                console.log(meetings.week);
            }
            console.log("hi");
            bot.sendMessage({
                to: 889222322819567716,
                message: ('@here Meeting Today! The ${meetings.section} section meets at ${meetings.time} in ${meetings.location}!')
            });
        }
    }
});