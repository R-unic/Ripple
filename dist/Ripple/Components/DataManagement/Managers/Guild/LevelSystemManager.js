"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelSystemManager = void 0;
const ToggleableManager_1 = require("../../Base/ToggleableManager");
class LevelSystemManager extends ToggleableManager_1.ToggleableManager {
    constructor(Client) {
        super(Client, "levelsystem", true);
        this.Client = Client;
    }
}
exports.LevelSystemManager = LevelSystemManager;
