const mongoose = require("../bin/mongodb");
const errorMessage = require("../util/errorMessage");

const categorySchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, errorMessage.GENERAL.obligatoryField]
    },
    state: {
        type: Boolean,
        default: true
    },
});

module.exports = mongoose.model("categories", categorySchema);