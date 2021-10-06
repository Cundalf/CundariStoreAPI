const mongoose = require("../bin/mongodb");
const errorMessage = require("../util/errorMessage");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, errorMessage.GENERAL.campo_obligatorio],
        minlength: [3, errorMessage.GENERAL.minlength]
    },
    description: {
        type: String,
        required: [true, errorMessage.GENERAL.campo_obligatorio]
    },
    sku: {
        type: String,
        required: [true, errorMessage.GENERAL.campo_obligatorio]
    },
    price: Number,
    quantity: Number,
    image: String,
    state: Boolean,
    popular: Boolean,
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "categories"
    },
});

productSchema.virtual("price_currency").get(function () {
    return "$ " + this.price;
});

productSchema.virtual("price_vat").get(function () {
    return this.price * 1.21;
});

productSchema.set("toJSON", { getters: true, virtuals: true });
productSchema.plugin(mongoose.mongoosePaginate);
module.exports = mongoose.model("products", productSchema);