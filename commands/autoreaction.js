const AutoReaction = require("../models/AutoReaction");

const embed = require("../embeds/embeds");
const permissionEmbed = require("../embeds/permissionEmbed");
const usageEmbed = require("../embeds/usageEmbed");

module.exports = {
    name: "autoreaction",

    async execute(client, message, args) {

        const ownerRoleId = process.env.OWNER_ROLE_ID;

        if (!message.member.roles.cache.has(ownerRoleId)) {
            return message.reply({
                embeds: [
                    embed(permissionEmbed(message.author, "Owner"))
                ]
            });
        }


        const sub = args[0];


        // ;autoreaction add user @user ❤️
        if (sub === "add") {

            const type = args[1];

            if (type === "user") {

                const user = message.mentions.users.first();
                const emoji = args[3];

                if (!user || !emoji) {
                    return message.reply({
                        embeds: [
                            embed(
                                usageEmbed(";autoreaction add user @user ❤️")
                            )
                        ]
                    });
                }

                await AutoReaction.create({
                    guildId: message.guild.id,
                    userId: user.id,
                    emoji
                });

                return message.reply(
                    `✅ Auto reaction added for ${user} ${emoji}`
                );
            }


            if (type === "trigger") {

                const trigger = args[2];
                const emoji = args[3];

                if (!trigger || !emoji) {
                    return message.reply({
                        embeds: [
                            embed(
                                usageEmbed(";autoreaction add trigger word ❤️")
                            )
                        ]
                    });
                }

                await AutoReaction.create({
                    guildId: message.guild.id,
                    trigger: trigger.toLowerCase(),
                    emoji
                });

                return message.reply(
                    `✅ Trigger reaction added: \`${trigger}\` ${emoji}`
                );
            }

        }


        // ;autoreaction remove user @user
        if (sub === "remove") {

            const type = args[1];

            if (type === "user") {

                const user = message.mentions.users.first();

                if (!user) return;

                await AutoReaction.findOneAndDelete({
                    guildId: message.guild.id,
                    userId: user.id
                });

                return message.reply("✅ User auto reaction removed.");
            }


            if (type === "trigger") {

                const trigger = args[2];

                if (!trigger) return;

                await AutoReaction.findOneAndDelete({
                    guildId: message.guild.id,
                    trigger: trigger.toLowerCase()
                });

                return message.reply("✅ Trigger reaction removed.");
            }

        }


        // ;autoreaction list
        if (sub === "list") {

            const data = await AutoReaction.find({
                guildId: message.guild.id
            });

            if (!data.length)
                return message.reply("❌ No auto reactions found.");

            let text = "";

            data.forEach((r, i) => {
                text += `${i + 1}. ${
                    r.userId ? `<@${r.userId}>` : `\`${r.trigger}\``
                } → ${r.emoji}\n`;
            });

            return message.reply(text);
        }
    }
};
