const { EmbedBuilder } = require("discord.js");

module.exports = (data) => {

    if (typeof data === "string") {
        return new EmbedBuilder()
            .setColor("#5865F2")
            .setDescription(data);
    }

    return new EmbedBuilder(data);

};
