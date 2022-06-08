"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterSystemManager = void 0;
const ToggleableManager_1 = require("../../Base/ToggleableManager");
class FilterSystemManager extends ToggleableManager_1.ToggleableManager {
    constructor(Client) {
        super(Client, "filtering", true);
        this.Client = Client;
    }
}
exports.FilterSystemManager = FilterSystemManager;
