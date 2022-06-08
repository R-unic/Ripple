"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModLogsManager = void 0;
const ToggleableManager_1 = require("../../Base/ToggleableManager");
class ModLogsManager extends ToggleableManager_1.ToggleableManager {
    constructor(Client) {
        super(Client, "modlogs", false);
        this.Client = Client;
    }
}
exports.ModLogsManager = ModLogsManager;
