module.exports = async (client, message) => {
    if (message.author.bot) return;
    if (!message.guild) return;

    const prefix = ";";

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    if (!command) return;

    try {
        await command.execute(client, message, args);
    } catch (error) {
        console.error(error);

        message.reply("❌ An error occurred while executing this command.");
    }
};
