"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationAPI = void 0;
const tslib_1 = require("tslib");
const console_1 = require("console");
const EndpointType_1 = require("./EndpointType");
const Endpoint_1 = require("./Endpoint");
const Request_1 = require("../Request");
const ms_1 = tslib_1.__importDefault(require("ms"));
class DonationAPI {
    constructor(client, apiKey) {
        this.client = client;
        this.apiKey = apiKey;
        this.newDonation = new Endpoint_1.Endpoint("new", EndpointType_1.EndpointType.NewDonation);
        this.processTransaction = new Endpoint_1.Endpoint("mark", EndpointType_1.EndpointType.ProcessTransaction);
    }
    StartTransactionsLoop() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            setTimeout(() => tslib_1.__awaiter(this, void 0, void 0, function* () { return yield this.StartTransactionsLoop(); }), (0, ms_1.default)("7m"));
            const headers = { Authorization: this.apiKey };
            const { donations } = yield Request_1.Request.GetJSON(this.newDonation.URL(), headers);
            donations.forEach((dn) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (dn.status === "Completed") {
                    this.client.Premium.Set(yield this.GetBuyer(dn.buyer_id), true)
                        .then(success => (0, console_1.log)(`
Purchase successful, premium granted
Success: ${success}
`))
                        .catch(err => (0, console_1.log)(`
Purchase failed, premium maybe granted
Success: ${false}
Error: ${err}`));
                    const transactionStatus = yield Request_1.Request.Post(this.processTransaction.URL(dn.txn_id), headers);
                    if (transactionStatus !== "OK")
                        (0, console_1.log)(`Error processing transaction, status: ${transactionStatus}`);
                    else
                        (0, console_1.log)(`
Transaction Status: ${transactionStatus}
Transaction ID: ${dn.txn_id}
Timestamp: ${dn.timestamp}
Buyer: (
    ID: ${dn.buyer_id}
    Email: ${dn.buyer_email}
)`);
                }
                else if (dn.status === "Refunded" || dn.status === "Reversed")
                    return yield this.Refund(dn);
                else
                    (0, console_1.log)("status", dn.status);
            }));
        });
    }
    Refund(dn) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.client.Premium.Set(yield this.GetBuyer(dn.buyer_id), false)
                .then(success => (0, console_1.log)(`
Refund successful, premium revoked
Success: ${success}
            `))
                .catch(err => (0, console_1.log)(`
Refund failed, premium maybe revoked
Success: ${false}
Error: ${err}
            `));
        });
    }
    GetBuyer(buyerID) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.client.users.fetch(buyerID, true, true);
        });
    }
}
exports.DonationAPI = DonationAPI;
