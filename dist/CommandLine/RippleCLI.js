"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RippleCLI = exports.pkg = void 0;
const tslib_1 = require("tslib");
const console_1 = require("console");
const util_1 = require("util");
const cp = tslib_1.__importStar(require("child_process"));
const exec = (0, util_1.promisify)(cp.exec);
exports.pkg = require(__dirname + "/../../package.json");
const programFile = "dist/Program.js";
const watchingExts = [".ts", ".js", ".json"];
const nodemonOpts = [programFile, "--trace-warnings", "-e", `${watchingExts.join(",")}`];
/**
 * @class Ripple Command Line Interface
 * @description Implementation of each subcommand for the Ripple CLI
*/
class RippleCLI {
    /**
     * @async
     * @param {string} version
     * @description Packs the NPM package into a tarball then installs it globally to update binaries
    */
    static Update(version) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const INVALID_VSN = "Invalid version number. (semver) / Failed to install package globally.";
            const PACK_FAIL = "Failed to pack into tarball.";
            if (!version.includes("."))
                return (0, console_1.log)(INVALID_VSN);
            const pkgName = `${exports.pkg.name}-${version}`;
            (0, console_1.log)(`Updating Ripple CLI to v${version}...`);
            (0, console_1.log)("Packing into tarball...");
            yield exec("npm pack").catch(err => {
                const e = new Error(PACK_FAIL);
                e.name = "PACK_FAIL";
                e.stack = err;
            });
            (0, console_1.log)("Installing new version globally...");
            yield exec(`npm i ${pkgName}.tgz --save -g`).catch(err => {
                const e = new Error(INVALID_VSN);
                e.name = "INVALID_VSN";
                throw e;
            });
            (0, console_1.log)("Removing package tarball...");
            yield exec(`rm ${pkgName}.tgz`).catch(err => (0, console_1.log)("WARN: Failed to remove tarball.", err));
            return (0, console_1.log)(`Successfully updated Ripple CLI! Version: ${version}`);
        });
    }
    /**
     * @async
     * @description Starts Ripple via nodemon
    */
    static Start() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.RunIndefiniteCommand(`nodemon`, nodemonOpts, "Ripple")
                .then(console_1.log)
                .catch(console_1.error);
        });
    }
    /**
     * @async
     * @description Runs an indefinite command asynchronously in a child process
     * @param {string} command
     * @param {string[]} args
     * @param {string} programAlias
     * @returns {Promise} Promise containing a success message, if rejected the error message
    */
    static RunIndefiniteCommand(command, args, programAlias) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                exec(`${command} ${args.join(" ")} &`).catch(reject);
                resolve(`${programAlias} is now running.`);
            });
        });
    }
}
exports.RippleCLI = RippleCLI;
