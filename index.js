const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const connectMongo = require("./config/mongoose");

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
    console.log(`${client.user.tag} is online!`);
});

client.login(process.env.TOKEN);
