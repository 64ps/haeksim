// CONFIG - BEGIN

const useRules = true; // boolean - Whether to print out a rules channel on kick or ban 
const rulesChannel = ""; // string - Your rules channel ID.

const modRole = message.guild.roles.get(""); // ID of your local Moderator role.

const BOT_TOKEN = "43Se8b2tBLvwaWuN6dMP2JbAaf7h5MHP3uUcqGqhMr5ZudertbGyaf53Ha"; // Obviously use your own. (don't even try to use this, this was generated randomly)

const BOT_OWNER = ""; // Your User ID

// CONFIG - END




var colors = require("colors"); // Using colors to instantly know what's going on-
                
console.log("Starte ChriLexBot".bold.bgBlue);

const Discord = require('discord.js');
const client = new Discord.Client();

const ver = "V1";

var prefix = "-->";

client.on('ready', () => {
  console.log(`Ready as ${client.user.tag}`.bgGreen);
    client.user.setActivity(prefix + "help.", {
        type: "watching"
    })
  client.user.setPresence({status: 'online' })

  
});

client.on('message', message => {
    var cmdTxt = message.content.split(" ")[0].substring(prefix.length);
    var suffix = message.content.substring(cmdTxt.length+prefix.length+1);

    if(message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
        
    if(command === "info") {
        message.reply("ChriLexBot v" + ver /* version is variable. */+ " \nProgrammer: sp46#0498" /* selfcrediting ftw haha */); 
    } else if(command === "help") {
        var helptext = "**ChriLexBot** Help::\n\n**" + prefix + "info** Shows info.\n**" + prefix + "say** Says the suffix\n=> **announce** and **delsay** do the same but mention everyone and delete the message, respectively\n**" + prefix + "kick** Kicks the user, as long as the author has the Moderator Role."
        message.reply(helptext);
        
    } else if(command === "kick") {
        if(message.member.roles.has(modRole)) {
            let member = message.mentions.members.first();
            let reason = args.slice(1).join(" ");
            member.kick(reason);
            if(useRules) {
                message.channel.send(member + " was kicked. " + "<#" + rulesChannel + ">");
            } else {
                message.channel.send(member + " was kicked.");
            }
        } else {
            message.author.id.toString();
            message.channel.send("<@" + message.author.id + ">, you can't kick.");
            message.delete();
          }
    } else if(command === "say") {
            suffix.toString();
            message.channel.send(suffix);
    } else if(command === "announce") {
        if(message.member.roles.has(modRole)) {
            suffix.toString();
            message.channel.send("@everyone " + suffix);
            message.delete();
        } else {
            message.author.id.toString();
            message.channel.send("<@" + message.author.id + ">, you can't announce.");
            message.delete();
        }
    } else if(command === "sayremove"||"saydel"||"delsay") {
            suffix.toString();
            message.channel.send(suffix);
            message.delete();
    } else if(command === "e-report") {
        message.reply("<@" + BOT_OWNER + "> " + message.author.tag + "reports the following: \"" + suffix + "\"");
    }
});     

client.login(BOT_TOKEN);