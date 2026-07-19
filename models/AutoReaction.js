const { Schema, model } = require("mongoose");

const autoReactionSchema = new Schema({

    guildId: {
        type: String,
        required: true
    },

    userId: {
        type: String,
        default: null
    },

    trigger: {
        type: String,
        default: null
    },

    emoji: {
        type: String,
        required: true
    }

});

module.exports = model("AutoReaction", autoReactionSchema);
