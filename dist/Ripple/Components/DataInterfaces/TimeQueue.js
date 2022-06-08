"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeQueue = void 0;
class TimeQueue {
    constructor(Tag, Length) {
        this.Tag = Tag;
        this.Length = Length;
        this.Added = Date.now() / 1000;
        this.Length /= 1000;
    }
}
exports.TimeQueue = TimeQueue;
