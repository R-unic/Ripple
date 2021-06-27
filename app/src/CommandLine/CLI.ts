import { createCommand } from "commander";
import { RippleCLI, pkg } from "./RippleCLI";

const program = createCommand();

program
    .command("help")
    .description("output a help menu")
    .action(() => program.outputHelp());

program
    .command("update")
    .description("update the Ripple CLI")
    .arguments("<version>")
    .action(version => RippleCLI.Update(version));

program
    .command("start")
    .description("start the daemon process for the Discord bot")
    .action(() => RippleCLI.Start());

program
    .version(pkg.version)
    .allowExcessArguments(false)
    .parse();