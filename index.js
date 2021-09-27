//Base code used from https://www.wikihow.com/Create-a-Bot-in-Discord
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

//ChefBot specific objects start
const cook = 'Cooking';
const garden =  'Gardening';

var meetings = {
    section: new String,
    week: 0,
    date: new Date(),
    day: 'Thursday',
    time: '6PM',
    location: 'EH100'
}
//ChefBot specific objects end

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
    //Only lets the specified user in the specified channel access controls.
    if (message.substring(0, 1) == '!' && userID == 223248267650007041 && channelID == 889222322819567716) {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);
        switch(cmd) {
            case 'start':
                console.log('Starting...')
                setInterval(() => {
                    if (meetings.week % 2 == 0) {
                        meetings.section = cook;
                        meetings.week++;
                        console.log('Meeting counter ' + meetings.week);
                    } else {
                        meetings.section = garden;
                        meetings.week++;
                        console.log('Meeting counter ' + meetings.week);
                    }
                    console.log('Sending reminder...');
                    bot.sendMessage({
                        to: '785949800986181724',
                        message: ('@here Meeting Today! The ' + meetings.section + ' section meets ' + meetings.day + ' at ' + meetings.time + ' in ' + meetings.location + '!')
                    });
                    console.log('Looping...');
                }, 604800000); 
            break;
            case 'loc':
                if(message.substring(5) == '') {
                    bot.sendMessage({
                        to: channelID,
                        message: ('Location is: ' + meetings.location)
                    });
                } else {
                    meetings.location = message.substring(5);
                    bot.sendMessage({
                        to: channelID,
                        message: ('Location set to: ' + meetings.location)
                    });
                }
                console.log('Location is currently ' + meetings.location);            
            break;
            case 'time':
                if(message.substring(6) == '') {
                    bot.sendMessage({
                        to: channelID,
                        message: ('Time is: ' + meetings.time)
                    });
                } else {
                    meetings.time = message.substring(6);
                    bot.sendMessage({
                        to: channelID,
                        message: ('Time set to: ' + meetings.time)
                    });
                }
                console.log('Time is currently ' + meetings.time);
            break;
            case 'day':
                if(message.substring(5) == '') {
                    bot.sendMessage({
                        to: channelID,
                        message: ('Day is: ' + meetings.day)
                    });
                } else {
                    meetings.day = message.substring(5);
                    bot.sendMessage({
                        to: channelID,
                        message: ('Day set to: ' + meetings.day)
                    });
                }
                console.log('Day is currently ' + meetings.day)
                ;
            break;
            case 'announce':
                bot.sendMessage({
                    to: '785949800986181724',
                    message: (message.substring(9))
                });
                console.log('Sent ' + message.substring(9) + 'to #Announcements')
            break;
         }
     }
});