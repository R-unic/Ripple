import { Package } from "../Ripple/Package";
import { exec } from "child_process";
import { log } from "console";

const displayCommandResult = (err, res) => log(res);

export const pkg: Package = require(__dirname + "/../../package.json");

export class RippleCLI {
    public static Update() {
        log("Updating Ripple CLI...");
        exec("npm pack", () => {
            log("Installing new version globally...");
            exec(`npm i ${pkg.name}-${pkg.version}.tgz -g`, () => {
                log("Successfully updated Ripple CLI!")
                exec(`rm ${pkg.name}-${pkg.version}.tgz`);
            });
        });
    }

    public static Start() {
        log("Started Ripple process!");
        exec("nodemon --trace-warnings out/Program.js -e .ts,.js,.json", displayCommandResult);
    }
}