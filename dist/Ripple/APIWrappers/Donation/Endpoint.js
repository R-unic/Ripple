"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endpoint = void 0;
class Endpoint {
    constructor(Path, Type) {
        this.Path = Path;
        this.Type = Type;
    }
    URL(txnID) {
        return `${Endpoint.BaseURL}/${txnID ? `${txnID}/${this.Path}` : this.Path}`;
    }
}
exports.Endpoint = Endpoint;
Endpoint.BaseURL = "https://donatebot.io/api/v1/donations/846604279288168468";
