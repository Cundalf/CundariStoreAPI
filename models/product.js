const mongoose = require("../bin/mongodb");
const errorMessage = require("../util/errorMessage");
const validators = require("../util/validators");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, errorMessage.GENERAL.obligatoryField],
        minlength: [3, errorMessage.GENERAL.minlength]
    },
    description: {
        type: String,
        required: [true, errorMessage.GENERAL.obligatoryField]
    },
    sku: {
        type: String,
        required: [true, errorMessage.GENERAL.obligatoryField]
    },
    price: {
        type: Number,
        required: [true, errorMessage.GENERAL.obligatoryField]
    },
    quantity: {
        type: Number,
        required: [true, errorMessage.GENERAL.obligatoryField]
    },
    image: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png",
        validate: {
            validator: function (value) {
                return validators.urlValidate(value);
            },
            message: errorMessage.PRODUCT.urlIncorrect
        }
    },
    state: {
        type: Boolean,
        default: true
    },
    popular: {
        type: Boolean,
        default: false
    },
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