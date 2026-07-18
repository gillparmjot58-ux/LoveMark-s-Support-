const Bind = require("../models/Bind");
const Category = require("../models/Category");

module.exports = {
    name: "messageCreate",

    async execute(client, message) {
        if (message.author.bot) return;
        if (!message.guild) return;
        if (message.content.startsWith(";")) return;
        if (!message.reference) return;

        // Toggle logic yahin add hoga.
    }
};
