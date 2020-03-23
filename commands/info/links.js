const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "links",
    aliases: ["l", "bot-info"],
    category: "info",
    description: "Returns all commands, or one specific command info",
    usage: "[command | alias]",
    run: async (client, message, args) => {

        let me = client.user;

        let website = "Still in the making!";
        let title = "Bot info";
        let merch = "Still in the making!";
        let invite = process.env.INVITELINK;
        let servers = 'We are working on this command, until we reach sharding point (about 2,000 servers) we wont be able to provide this number for you. Sorry for the inconvinience'

        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(title)
            .addField("Bot information", stripIndents`**- Username:** ${me}
            **- Website** ${website}
            **- Merch:** ${merch}
            **- Member count:** ${servers}
            **- Invite link:** ${invite}`);   
        
        message.channel.send(embed)
    }
}