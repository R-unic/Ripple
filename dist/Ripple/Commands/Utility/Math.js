"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const APICommand_1 = require("../../Components/CommandClasses/APICommand");
const Util_1 = require("../../Util");
const operations = [
    "simplify",
    "factor",
    "derive",
    "integrate",
    "zeroes",
    "tangent",
    "area",
    "cos",
    "sin",
    "tan",
    "arccos",
    "arcsin",
    "arctan",
    "abs",
    "log",
    "operations"
];
class default_1 extends APICommand_1.APICommand {
    constructor() {
        const name = "math";
        super(name, {
            aliases: [name, "arithmetic", "mathhelp", "solvemath", "mathsolver"],
            description: {
                content: "Returns the result of a math operation. Use `pi` to refer to Pi. Run `::math operations` for a list of valid operations.",
                usage: '<operation> <"expression">'
            },
            args: [
                (0, Util_1.Arg)("operation", operations),
                (0, Util_1.Arg)("expression", "string")
            ]
        });
    }
    exec(msg, { operation, expression }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!operation)
                return this.client.Logger.MissingArgError(msg, "operation");
            operation = operation.toLowerCase();
            if (!expression && operation !== "operations")
                return this.client.Logger.MissingArgError(msg, "expression");
            if (operation === "operations")
                return msg.reply(this.client.Embed("📊 Valid Math Operations 🧮")
                    .setDescription(operations.join(",\n")));
            return this.RequestAPI(msg, `https://newton.now.sh/api/v2/${operation}/${encodeURIComponent(expression)}`)
                .then(({ result }) => msg.reply(this.client.Embed("📊 Math Solver 🧮")
                .addField("Input", expression.toLowerCase(), true)
                .addField("Result", result)));
        });
    }
}
exports.default = default_1;
