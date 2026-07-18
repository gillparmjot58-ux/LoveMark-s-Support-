const { Schema, model } = require("mongoose");

const autoReactionSchema = new Schema({
    guildId: {
        type: String,
        required: true
    },

    userId: {
        type: String,
        required: true
    },

    emoji: {
        type: String,
        required: true
    }
});

module.exports = model("AutoReaction", autoReactionSchema);
