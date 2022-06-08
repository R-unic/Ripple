"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurgeManager = void 0;
const ToggleableManager_1 = require("../../Base/ToggleableManager");
class PurgeManager extends ToggleableManager_1.ToggleableManager {
    constructor(Client) {
        super(Client, "purge", true);
        this.Client = Client;
    }
}
exports.PurgeManager = PurgeManager;
