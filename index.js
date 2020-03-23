/*

Trello: https://trello.com/b/eIi7UI55/elon-musk-bot

If you dont know what youre doing dont go below this line
that goes for me too because i dont knwo what i did last-
night but it is working somehow! thanks lastnight me!

if you do want to got belkow this line then go all the 
way down to line #80 forget anything before that... good?

All i currently know rn is that i need to add more commands
under the commands folder, especially moderation

*/

//------------------------ Settings ------------------------//

// Version
const version = 'v1.0.0'

// Prefix
const pr = 'e/'

//----------------------------------------------------------//

const { Client, MessageEmbed, Collection } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");

const client = new Client({
    disableEveryone: true
})

client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

config({
    path: __dirname + "/.env"
});

// Adds the e/ to each command as well as imports thhe commands from the command handler
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

// Turn bot on
client.on('ready', () => {
    console.log(`This bot, ${client.user.tag}, is online! ` + version);
    // Sets bots status
    client.user.setActivity('Visual Studio Code');
});

// Command Handler
client.on("message", async message => {
    const prefix = pr;

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    // If message.member is uncached, cache it.
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    // Get the command
    let command = client.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    // If a command is finally found, run the command
    if (command) 
        command.run(client, message, args);
})

// Log into our bot account/app
client.login(process.env.DISCORD_TOKEN);

//----------------------------------------------------------//
//
// Useless shit dont go below this line. indeed?
//
//----------------------------------------------------------//

// indeed.com -- Drews request
client.on('message', msg => {
    if (msg.content === 'indeed') {
        msg.channel.send('indeed.com');
    }
});

// hotel? trivago -- Judes request
client.on('message', msg => {
    if (msg.content === 'hotel') {
        msg.channel.send('trivago');
    }
});