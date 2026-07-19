const express = require("express");
const { Client, GatewayIntentBits, Events } = require("discord.js");
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
    console.log(`🌐 Web server running on port ${PORT}`);
});

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ]
});

// Error Logs
client.on("error", console.error);
client.on("warn", console.warn);
client.on("debug", () => {});
client.on("shardError", console.error);

// Ready Event
client.once(Events.ClientReady, async (client) => {
    try {
        await connectMongo();

        commandHandler(client);
        eventHandler(client);

        console.log(`✅ ${client.user.tag} is online!`);
        console.log(`🆔 Bot ID: ${client.user.id}`);
    } catch (err) {
        console.error(err);
    }
});

// Login
client.login(process.env.TOKEN).catch(console.error);
