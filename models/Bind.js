const { Schema, model } = require("mongoose");

const bindSchema = new Schema({
    guildId: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    trigger: {
        type: String,
        required: true
    },

    roleId: {
        type: String,
        required: true
    }
});

module.exports = model("Bind", bindSchema);
