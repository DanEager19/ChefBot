var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
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
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: '889222322819567716',
                    message: '@here Meeting Today!'
                });
            break;
            // Just add any case commands if you want to..
         }
     }
});
bot.on('meeting', function (user, userID, channelID, message, evt) {
    var msg1 = "Cooking";
    var msg2 = "Gardening";
    var location = "TCB Auditorium";
    //if() { 

        bot.sendMessage({
            to: channelID,
            message: ('@here Meeting Today! The ' + msg1 + "meets at 6 PM in the " + location +"!")
        });
   // }

});