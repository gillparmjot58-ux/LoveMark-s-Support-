const { EmbedBuilder } = require("discord.js");

module.exports = (description) => {
    return new EmbedBuilder()
        .setColor("#5865F2")
        .setDescription(description);
};
