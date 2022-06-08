"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const tslib_1 = require("tslib");
const dotenv_1 = require("dotenv");
const Client_1 = tslib_1.__importDefault(require("./Ripple/Client"));
exports.Client = Client_1.default;
(0, dotenv_1.config)({ path: `${__dirname}/../.env` });
new Client_1.default;
