const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "say",
    aliases: ["bc", "broadcast"],
    category: "moderation",
    description: "Says your input via the bot",
    usage: "<input>",
    run: (client, message, args) => {
        if (message.deletable) message.delete();

        if (!message.member.hasPermission("MANAGE_MESSAGES"))
        return message.reply("You don't have the required permissions to use this command.").then(m => m.delete({ timeout: 5000}));

        if (args.length < 1) return message.reply(`Nothing to say?`).then(m => m.delete({ timeout: 5000}));
        
        const roleColor = message.guild.me.roleColor;

        if (args[0].toLowerCase() === "embed") {
            const embed = new MessageEmbed()
                .setDescription(args.slice(1).join(" "))
                .setColor(roleColor === "#000000" ? "#ffffff" :  roleColor)
                .setTimestamp()
                .setFooter(message.member.displayName, message.author.displayAvatarURL())
                .setAuthor(message.author.username + ' said:', message.author.displayAvatarURL());

            message.channel.send(embed);
            console.log(`said ${args.slice(1).join(" ")} in an embed for ${message.author.username}`)
        } else {
            message.channel.send(args.join(" "));
            console.log(`said ${args.join(" ")} in normal text for ${message.author.username}`)
        }
    }    
}