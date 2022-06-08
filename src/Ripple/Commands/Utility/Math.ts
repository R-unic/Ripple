import { APICommand } from "../../Components/CommandClasses/APICommand";
import { Message } from "discord.js";
import { Arg } from "../../Util";

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

export default class extends APICommand {
    public constructor() {
        const name = "math";
        super(name, {
            aliases: [name, "arithmetic", "mathhelp", "solvemath", "mathsolver"],
            description: {
                content: "Returns the result of a math operation. Use `pi` to refer to Pi. Run `::math operations` for a list of valid operations.",
                usage: '<operation> <"expression">'
            },
            args: [ 
                Arg("operation", operations),
                Arg("expression", "string")
            ]
        });
    }

    public async exec(msg: Message, { operation, expression }: { operation: string, expression?: string }) {
        if (!operation)
            return this.client.Logger.MissingArgError(msg, "operation");

        operation = operation.toLowerCase();
        if (!expression && operation !== "operations")
            return this.client.Logger.MissingArgError(msg, "expression");
        
        if (operation === "operations")
            return msg.reply(
                this.client.Embed("📊 Valid Math Operations 🧮")
                    .setDescription(operations.join(",\n"))
            );

        return this.RequestAPI<{
            result: string;
        }>(msg, `https://newton.now.sh/api/v2/${operation}/${encodeURIComponent(expression)}`)
            .then(({ result }) => msg.reply(
                this.client.Embed("📊 Math Solver 🧮")
                    .addField("Input", expression.toLowerCase(), true)
                    .addField("Result", result)
            ));
    }
}