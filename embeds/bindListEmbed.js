module.exports = (binds) => {
    return binds.map((bind, index) =>
        `\`${index + 1}\` **${bind.trigger}** → <@&${bind.roleId}> \`[${bind.category}]\``
    ).join("\n");
};
