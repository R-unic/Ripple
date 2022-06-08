"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfractionManager = exports.Infraction = void 0;
const tslib_1 = require("tslib");
class Infraction {
    constructor(Issuer, Recipient, Reason) {
        this.Issuer = Issuer;
        this.Recipient = Recipient;
        this.Reason = Reason;
    }
}
exports.Infraction = Infraction;
class InfractionManager {
    constructor(Client) {
        this.Client = Client;
        this.Tag = "infractions";
    }
    Clear(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const infractions = yield this.Get(user);
            const amountCleared = infractions.length;
            yield this.Set(user, []);
            return amountCleared;
        });
    }
    Find(user, index) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const infractions = yield this.Get(user);
            return infractions[index - 1];
        });
    }
    Remove(user, infraction) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const infractions = yield this.Get(user);
            const idx = infractions.indexOf(infraction);
            infractions.splice(idx - 1, 1);
            return this.Set(user, infractions);
        });
    }
    Add(user, infraction) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const infractions = yield this.Get(user);
            infractions.push(infraction);
            return this.Set(user, infractions);
        });
    }
    Get(user, defaultValue) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Get(user, this.Tag, defaultValue !== null && defaultValue !== void 0 ? defaultValue : [], user.id);
        });
    }
    Set(user, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Set(user, this.Tag, value, user.id);
        });
    }
}
exports.InfractionManager = InfractionManager;
