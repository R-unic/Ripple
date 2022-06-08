"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesManager = exports.Note = void 0;
const tslib_1 = require("tslib");
class Note {
    constructor(Title, Content, Timestamp) {
        this.Title = Title;
        this.Content = Content;
        this.Timestamp = Timestamp;
    }
}
exports.Note = Note;
class NotesManager {
    constructor(Client) {
        this.Client = Client;
        this.Tag = "notes";
    }
    Find(user, title) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const notes = yield this.Has(user);
            return notes.filter(note => note.Title === title);
        });
    }
    Remove(user, title) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const notes = yield this.Find(user, title);
            notes.splice(0, notes.length);
            return this.Set(user, notes);
        });
    }
    Add(user, note) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const notes = yield this.Has(user);
            notes.push(note);
            return this.Set(user, notes);
        });
    }
    Has(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.GetForUser(user, this.Tag, []);
        });
    }
    Set(user, notes) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.Client.SetForUser(user, this.Tag, notes);
        });
    }
}
exports.NotesManager = NotesManager;
