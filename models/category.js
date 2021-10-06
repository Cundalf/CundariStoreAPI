const mongoose = require("../bin/mongodb");

const categorySchema = new mongoose.Schema({
    description: String,
    state: Boolean
});

module.exports = mongoose.model("categories", categorySchema);