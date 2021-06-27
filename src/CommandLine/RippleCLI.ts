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
    public static async Update(version: string): Promise<void> {
        const INVALID_VSN = "Invalid version number. (semver) / Failed to install package globally.";
        const PACK_FAIL = "Failed to pack into tarball.";

        if (!version.includes("."))
            return log(INVALID_VSN);

        const pkgName = `${pkg.name}-${version}`;
        log(`Updating Ripple CLI to v${version}...`);
        log("Packing into tarball...")
        await exec("npm pack").catch(err => {
            const e = new Error(PACK_FAIL);
            e.name = "PACK_FAIL";
            e.stack = err;
        });
        log("Installing new version globally...");
        await exec(`npm i ${pkgName}.tgz --save -g`).catch(err => {
            const e = new Error(INVALID_VSN);
            e.name = "INVALID_VSN";
            throw e;
        });
        log("Removing package tarball...");
        await exec(`rm ${pkgName}.tgz`).catch(err => log("WARN: Failed to remove tarball.", err));
        return log(`Successfully updated Ripple CLI! Version: ${version}`);
    }

    /**
     * @async
     * @description Starts Ripple via nodemon
    */
    public static async Start(): Promise<void> {
        return this.RunIndefiniteCommand(`nodemon`, nodemonOpts, "Ripple")
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