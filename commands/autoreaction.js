const AutoReaction = require("../models/AutoReaction");

const embed = require("../embeds/embeds");
const permissionEmbed = require("../embeds/permissionEmbed");
const usageEmbed = require("../embeds/usageEmbed");

const autoReactionAddEmbed = require("../embeds/autoReactionAddEmbed");
const autoReactionRemoveEmbed = require("../embeds/autoReactionRemoveEmbed");
const autoReactionListEmbed = require("../embeds/autoReactionListEmbed");

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


                const total = await AutoReaction.countDocuments({
                    guildId: message.guild.id
                });


                return message.reply({
                    embeds: [
                        embed(
                            autoReactionAddEmbed(
                                emoji,
                                `<@${user.id}>`,
                                total
                            )
                        )
                    ]
                });

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


                const total = await AutoReaction.countDocuments({
                    guildId: message.guild.id
                });


                return message.reply({
                    embeds: [
                        embed(
                            autoReactionAddEmbed(
                                emoji,
                                `"${trigger}"`,
                                total
                            )
                        )
                    ]
                });

            }

        }



        // ;autoreaction remove user @user
        if (sub === "remove") {

            const type = args[1];


            if (type === "user") {

                const user = message.mentions.users.first();

                if (!user) return;


                const data = await AutoReaction.findOneAndDelete({
                    guildId: message.guild.id,
                    userId: user.id
                });


                if (!data) return;


                return message.reply({
                    embeds: [
                        embed(
                            autoReactionRemoveEmbed(
                                data.emoji,
                                `<@${user.id}>`
                            )
                        )
                    ]
                });

            }
                        if (type === "trigger") {

                const trigger = args[2];

                if (!trigger) return;


                const data = await AutoReaction.findOneAndDelete({
                    guildId: message.guild.id,
                    trigger: trigger.toLowerCase()
                });


                if (!data) return;


                return message.reply({
                    embeds: [
                        embed(
                            autoReactionRemoveEmbed(
                                data.emoji,
                                `"${trigger}"`
                            )
                        )
                    ]
                });

            }

        }



        // ;autoreaction list
        if (sub === "list") {

            const data = await AutoReaction.find({
                guildId: message.guild.id
            });


            if (!data.length) {
                return message.reply({
                    embeds: [
                        embed(autoReactionListEmbed("No auto reactions found."))
                    ]
                });
            }


            let text = "";


            data.forEach((r, i) => {

                if (r.userId) {
                    text += `\`${i + 1}.\` <@${r.userId}> → ${r.emoji} (${i + 1})\n`;
                }


                if (r.trigger) {
                    text += `\`${i + 1}.\` Word Trigger: "${r.trigger}" → ${r.emoji} (${i + 1})\n`;
                }

            });


            return message.reply({
                embeds: [
                    embed(
                        autoReactionListEmbed(text)
                    )
                ]
            });

        }

    }
};
