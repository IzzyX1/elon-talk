const { MessageEmbed } = require("discord.js");
const beautify = require("beautify")

module.exports = {
    name: "eval",
    aliases: ["e", "evaluate", "evaluation", "run"],
    description: "Evaluates and runs your JS code",
    usage: "<code to eval>",
    run: async (client, message, args) => {
        if(message.author.id !== "548322511218147332") {
            return message.channel.send("You do not have permission to run this command!")
            .then(m => m.delete({ timeout: 5000}));
        }

        if(!args[0]) {
            message.channel.send("Please put code to evaluate!")
            .then(m => m.delete({ timeout: 5000}));
        }

        try {
            if (args.join(" ").toLowerCase().includes("token")) {
                return;
            }

            const toEval = args.join(" ")
            const evaluated = eval(toEval)

            let embed = new MessageEmbed()
                .setColor("#00FF00")
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .setTitle("Eval")
                .addField("To evaluate:", `\`\`\`js\n${beautify(args.join(" "), { format: "js"})}\n\`\`\``)
                .addField("Evaluated:", evaluated)
                .addField("Type of:", typeof(evaluated));

            message.channel.send(embed);
        } catch (e) {

            let embed = new MessageEmbed()
                .setColor("#FF0000")
                .setTitle("\:x: Error!")
                .setDescription(e)
                .setFooter(client.user.username, client.user.displayAvatarURL())

            message.channel.send(embed);
        }
    }
}