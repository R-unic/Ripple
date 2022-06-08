"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EconomyManager = void 0;
const ToggleableManager_1 = require("../../Base/ToggleableManager");
class EconomyManager extends ToggleableManager_1.ToggleableManager {
    constructor(Client) {
        super(Client, "economy", true);
        this.Client = Client;
    }
}
exports.EconomyManager = EconomyManager;
