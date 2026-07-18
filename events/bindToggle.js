const Bind = require("../models/Bind");
const Category = require("../models/Category");

module.exports = {
    name: "messageCreate",

    async execute(client, message) {
        if (message.author.bot) return;
        if (!message.guild) return;
        if (message.content.startsWith(";")) return;
        if (!message.reference) return;

        const trigger = message.content.trim().toLowerCase();
        if (!trigger) return;

        const bind = await Bind.findOne({
            guildId: message.guild.id,
            trigger
        });

        if (!bind) return;

        const category = await Category.findOne({
            guildId: message.guild.id,
            name: bind.category
        });

        if (!category) return;

        if (
            category.permissionRole &&
            !message.member.roles.cache.has(category.permissionRole)
        ) {
            return message.reply(
                `<:emoji_158:1527900882128080966> ${message.author}: You are missing required permission: \`${category.permissionRole}\``
            );
        }

        const repliedMessage = await message.channel.messages.fetch(
            message.reference.messageId
        );

        const member = await message.guild.members.fetch(
            repliedMessage.author.id
        );

        const role = message.guild.roles.cache.get(bind.roleId);

        if (!role) {
            return message.reply("❌ Bound role no longer exists.");
        }

        if (member.roles.cache.has(role.id)) {
            await member.roles.remove(role);

            return message.reply(
                `✅ Removed ${role} from ${member}.`
            );
        }

        await member.roles.add(role);

        return message.reply(
            `✅ Added ${role} to ${member}.`
        );
    }
};
