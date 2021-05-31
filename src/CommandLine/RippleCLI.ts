import { Package } from "../Ripple/Package";
import { error, log } from "console";
import { promisify } from "util";
import * as cp from "child_process";
const exec = promisify(cp.exec);

export const pkg: Package = require(__dirname + "/../../package.json");
const programFile = "out/Program.js";
const watchingExts = [".ts", ".js", ".json"];
const nodemonOpts = [programFile, "--trace-warnings", "-e", `${watchingExts.join(",")}`];

/**
 * @class Ripple Command Line Interface
 * @description Implementation of each subcommand for the Ripple CLI
*/
export class RippleCLI {
    /**
     * @async
     * @param {string} version
     * @description Packs the NPM package into a tarball then installs it globally to update binaries
    */
    public static async Update(version: string) {
        const pkgName = `${pkg.name}-${version}`;
        log("Updating Ripple CLI...");
        await exec("npm pack").catch(err => log("FATAL: Failed to pack into tarball.", err));
        log("Installing new version globally...");
        await exec(`npm i ${pkgName}.tgz --save -g`).catch(err => log("FATAL: Failed to install tarball globally.", err));
        log("Removing package tarball...");
        await exec(`rm ${pkgName}.tgz`).catch(err => log("WARN: Failed to remove tarball.", err));
        log("Successfully updated Ripple CLI!");
    }

    /**
     * @async
     * @description Starts Ripple child process as a daemon
    */
    public static async Start() {
        this.RunIndefiniteCommand(`nodemon`, nodemonOpts, "Ripple")
            .then(log)
            .catch(error);
    }

    /**
     * @async
     * @description Runs an indefinite command asynchronously in a child process
     * @param {string} command
     * @param {string[]} args
     * @param {string} programAlias
     * @returns {Promise} Promise containing a success message, if rejected the error message
    */
    private static async RunIndefiniteCommand(command: string, args: string[], programAlias: string): Promise<string> {
        return new Promise((resolve, reject) => {
            exec(`${command} ${args.join(" ")} &`).catch(reject);
            resolve(`${programAlias} is now running.`);
        })
    }
}