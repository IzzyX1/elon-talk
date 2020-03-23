const { MessageEmbed } = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports = {
    name: "reddit",
    aliases: ["rdt", "subreddit"],
    category: "fun",
    description: "Sends an epic meme",
    run: async (client, message, args) => {
        if (!args[0])
            return message.channel.send("Please provide a SubReddit to grab an image from! If you are confused then type: 'e/h reddit'. (ERR: N-ARG1)").then(m => m.delete({ timeout: 5000}));
        // In this array, 
        // you can put the subreddits you want to grab memes from
        const sub = args.slice(0).join(" ")

        // Get a random image from the subreddit page
        const img = await randomPuppy(sub);
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setTitle(`From /r/${sub}`)
            .setURL(`https://reddit.com/r/${sub}`);

        message.channel.send(embed);
    }
}