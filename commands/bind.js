const Bind = require("../models/Bind");
const Category = require("../models/Category");

const embed = require("../embeds/embeds");
const bindEmbed = require("../embeds/bindEmbed");
const bindRemoveEmbed = require("../embeds/bindRemoveEmbed");
const bindListEmbed = require("../embeds/bindListEmbed");
const permissionEmbed = require("../embeds/permissionEmbed");
const usageEmbed = require("../embeds/usageEmbed");
const notFoundEmbed = require("../embeds/notFoundEmbed");
const errorEmbed = require("../embeds/errorEmbed");

module.exports = {
    name: "bind",

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

        // ;bind add Staff crew @Crew
        if (sub === "add") {

            const category = args[1];
            const trigger = args[2]?.toLowerCase();
            const role = message.mentions.roles.first();

            if (!category || !trigger || !role) {
                return message.reply({
                    embeds: [
                        embed(
                            usageEmbed(";bind add {category} {trigger} @Role")
                        )
                    ]
                });
            }
                        const categoryData = await Category.findOne({
                guildId: message.guild.id,
                name: category.toLowerCase()
            });

            if (!categoryData) {
                return message.reply({
                    embeds: [
                        embed(notFoundEmbed("Category"))
                    ]
                });
            }

            const exists = await Bind.findOne({
                guildId: message.guild.id,
                trigger
            });

            if (exists) {
                return message.reply({
                    embeds: [
                        embed(errorEmbed("Trigger already exists."))
                    ]
                });
            }

            await Bind.create({
                guildId: message.guild.id,
                category: category.toLowerCase(),
                trigger,
                roleId: role.id
            });

            return message.reply({
                embeds: [
                    embed(bindEmbed(message.author, trigger, role))
                ]
            });
        }

        // ;bind remove crew
        if (sub === "remove") {

            const trigger = args[1]?.toLowerCase();

            if (!trigger) {
                return message.reply({
                    embeds: [
                        embed(
                            usageEmbed(";bind remove {trigger}")
                        )
                    ]
                });
            }
                        const deleted = await Bind.findOneAndDelete({
                guildId: message.guild.id,
                trigger
            });

            if (!deleted) {
                return message.reply({
                    embeds: [
                        embed(notFoundEmbed("Bind"))
                    ]
                });
            }

            return message.reply({
                embeds: [
                    embed(`<:emoji_159:1528161527344136323> ${message.author}: Removed bind \`${trigger}\`.`)
                ]
            });
        }

        // ;bind list
        if (sub === "list") {

            const binds = await Bind.find({
                guildId: message.guild.id
            });

            if (!binds.length) {
                return message.reply({
                    embeds: [
                        embed(notFoundEmbed("Binds"))
                    ]
                });
            }

            return message.reply({
                embeds: [
                    embed(bindListEmbed(binds))
                ]
            });
        }
    }
};
