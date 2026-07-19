module.exports = (categories) => {
    return categories.map((category, index) =>
        `\`${index + 1}\` **${category.name}**`
    ).join("\n");
};
