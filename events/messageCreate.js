const AutoReaction = require("../models/AutoReaction");

module.exports = {
    name: "messageCreate",

    async execute(client, message) {

        if (message.author.bot) return;
        if (!message.guild) return;


        // Auto Reaction System
        try {
            const reactions = await AutoReaction.find({
                guildId: message.guild.id
            });

            for (const data of reactions) {

                // Added user reaction
                if (data.userId && data.userId === message.author.id) {
                    await message.react(data.emoji);
                    continue;
                }

                // Trigger word reaction
                if (
                    data.trigger &&
                    message.content
                        .toLowerCase()
                        .includes(data.trigger.toLowerCase())
                ) {
                    await message.react(data.emoji);
                }

            }

        } catch (error) {
            console.error("AutoReaction Error:", error);
        }


        // Command Handler
        const prefix = ";";

        if (!message.content.startsWith(prefix)) return;

        const args = message.content
            .slice(prefix.length)
            .trim()
            .split(/\s+/);

        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName);

        if (!command) return;

        try {
            await command.execute(client, message, args);
        } catch (error) {
            console.error(error);
            message.reply("❌ Error while executing command.");
        }
    }
};
