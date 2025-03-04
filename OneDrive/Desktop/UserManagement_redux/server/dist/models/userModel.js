"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    image: {
        type: String,
        default: null
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});
exports.default = userSchema;
