"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "http://localhost:5173/",
    credentials: true
}));
app.use(express_1.default.json());
const MONGODB_URI = process.env.MONGOURL || "mongodb://localhost:27017/";
mongoose_1.default.connect(MONGODB_URI)
    .then(() => { console.log("MongoDB connected"); })
    .catch(err => console.log('Error connecting to mongodb'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(` Server running on port ${PORT}`); });
