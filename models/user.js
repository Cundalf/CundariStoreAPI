const mongoose = require("../bin/mongodb");
const errorMessage = require("../util/errorMessage");
const validators = require("../util/validators");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, errorMessage.GENERAL.obligatoryField],
    },
    email: {
        type: String,
        required: [true, errorMessage.GENERAL.obligatoryField],
        unique: true

    },
    password: {
        type: String,
        required: [true, errorMessage.GENERAL.obligatoryField],
        validate: {
            validator: function (value) {
                return validators.isGoodPassword(value);
            },
            message: errorMessage.USERS.passwordIncorrect
        }
    },
    role: {
        type: String,
        default: 'user',
        enum: {
            values: ['user', 'admin', 'employee'],
            message: 'El rol {VALUE} no es soportado'
        }
    },
    state: {
        type: Boolean,
        default: true
    },
});

userSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

module.exports = mongoose.model("users", userSchema);