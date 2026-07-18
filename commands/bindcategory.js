const Category = require("../models/Category");

module.exports = {
    name: "bindcategory",

    async execute(client, message, args) {

        // Owner Role Check
        const ownerRoleId = process.env.OWNER_ROLE_ID;

        if (!message.member.roles.cache.has(ownerRoleId)) {
            return message.reply(
                "<:emoji_158:1527900882128080966> " +
                `${message.author}: You are missing required permission: \`Owner\``
            );
        }

        const sub = args[0];

        // ;bindcategory add Staff
        if (sub === "add") {

            const name = args.slice(1).join(" ");

            if (!name) {
                return message.reply("Usage: ;bindcategory add {name}");
            }

            const exists = await Category.findOne({
                guildId: message.guild.id,
                name: name.toLowerCase()
            });

            if (exists) {
                return message.reply("❌ This category already exists.");
            }

            await Category.create({
                guildId: message.guild.id,
                name: name.toLowerCase()
            });

            return message.reply(`✅ Category \`${name}\` created.`);
        }

        // ;bindcategory Staff permission @Role
        const category = args[0];
        const action = args[1];
        const role = message.mentions.roles.first();

        if (action === "permission") {

            if (!role) {
                return message.reply("Mention a role.");
            }

            const data = await Category.findOne({
                guildId: message.guild.id,
                name: category.toLowerCase()
            });

            if (!data) {
                return message.reply("❌ Category not found.");
            }

            data.permissionRole = role.id;
            await data.save();

            return message.reply(
                `✅ Permission for \`${category}\` set to ${role}.`
            );
        }

    }
};
