"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const RippleCLI_1 = require("./RippleCLI");
const program = (0, commander_1.createCommand)();
program
    .command("help")
    .description("output a help menu")
    .action(() => program.outputHelp());
program
    .command("update")
    .description("update the Ripple CLI")
    .arguments("<version>")
    .action(version => RippleCLI_1.RippleCLI.Update(version));
program
    .command("start")
    .description("start the daemon process for the Discord bot")
    .action(() => RippleCLI_1.RippleCLI.Start());
program
    .version(RippleCLI_1.pkg.version)
    .allowExcessArguments(false)
    .parse();
