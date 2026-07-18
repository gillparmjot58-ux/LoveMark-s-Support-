const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
    guildId: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    permissionRole: {
        type: String,
        default: null
    }
});

module.exports = model("Category", categorySchema);
