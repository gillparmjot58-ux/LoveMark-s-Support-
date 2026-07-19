const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const connectMongo = require("./config/mongoose");
const commandHandler = require("./handlers/commandHandler");
const eventHandler = require("./handlers/eventHandler");

const app = express();

app.get("/", (req, res) => {
    res.send("Bot is running!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Web server running on port ${PORT}`);
});

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ]
});

client.once("ready", async () => {
    await connectMongo();

    commandHandler(client);
    eventHandler(client);

    console.log(`${client.user.tag} is online!`);
});

client.login(process.env.TOKEN);
