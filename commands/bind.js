const Bind = require("../models/Bind");
const Category = require("../models/Category");

module.exports = {
    name: "bind",

    async execute(client, message, args) {

        const ownerRoleId = process.env.OWNER_ROLE_ID;

        if (!message.member.roles.cache.has(ownerRoleId)) {
            return message.reply(
                `<:emoji_158:1527900882128080966> ${message.author}: You are missing required permission: \`Owner\``
            );
        }

        const sub = args[0];

        // ;bind add Staff crew @Crew
        if (sub === "add") {

            const category = args[1];
            const trigger = args[2]?.toLowerCase();
            const role = message.mentions.roles.first();

            if (!category || !trigger || !role) {
                return message.reply(
                    "Usage: `;bind add {category} {trigger} @Role`"
                );
            }

            const categoryData = await Category.findOne({
                guildId: message.guild.id,
                name: category.toLowerCase()
            });

            if (!categoryData)
                return message.reply("❌ Category not found.");

            const exists = await Bind.findOne({
                guildId: message.guild.id,
                trigger
            });

            if (exists)
                return message.reply("❌ Trigger already exists.");

            await Bind.create({
                guildId: message.guild.id,
                category: category.toLowerCase(),
                trigger,
                roleId: role.id
            });

            return message.reply(
                `✅ Bind created.\nCategory: \`${category}\`\nTrigger: \`${trigger}\`\nRole: ${role}`
            );
        }

        // ;bind remove crew
        if (sub === "remove") {

            const trigger = args[1]?.toLowerCase();

            if (!trigger)
                return message.reply(
                    "Usage: `;bind remove {trigger}`"
                );

            const deleted = await Bind.findOneAndDelete({
                guildId: message.guild.id,
                trigger
            });

            if (!deleted)
                return message.reply("❌ Bind not found.");

            return message.reply(`✅ Removed bind \`${trigger}\`.`);
        }

        // ;bind list
        if (sub === "list") {

            const binds = await Bind.find({
                guildId: message.guild.id
            });

            if (!binds.length)
                return message.reply("No binds found.");

            const list = binds.map(b =>
                `• **${b.trigger}** → <@&${b.roleId}> (**${b.category}**)`
            ).join("\n");

            return message.reply({
                content: `## Bind List\n${list}`
            });
        }
    }
};
