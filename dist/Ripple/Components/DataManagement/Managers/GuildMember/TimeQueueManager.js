"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeQueueManager = void 0;
const tslib_1 = require("tslib");
class TimeQueueManager {
    constructor(Client) {
        this.Client = Client;
        this.Tag = "timequeue";
    }
    Elapsed(user, queue) {
        const elapsed = (Date.now() / 1000) - queue.Added;
        if (elapsed >= (queue === null || queue === void 0 ? void 0 : queue.Length))
            this.Remove(user, queue);
        return elapsed;
    }
    Find(user, tag) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queue = yield this.Get(user);
            for (const q of queue)
                if ((q === null || q === void 0 ? void 0 : q.Tag) === tag)
                    return q;
        });
    }
    Remove(user, ...queues) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queue = yield this.Get(user);
            for (const specified of queues)
                for (const other of queue)
                    if (other.Tag === specified.Tag)
                        delete queue[queue.indexOf(other)];
            return this.Set(user, queue);
        });
    }
    Add(user, ...queues) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const queue = yield this.Get(user);
            queue.push(...queues);
            return this.Set(user, queue);
        });
    }
    Get(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Get(user, this.Tag, [], user.id);
        });
    }
    Set(user, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.Set(user, this.Tag, value, user.id);
        });
    }
}
exports.TimeQueueManager = TimeQueueManager;
