const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const connectMongo = require("./config/mongoose");
const commandHandler = require("./handlers/commandHandler");
const eventHandler = require("./handlers/eventHandler");

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
