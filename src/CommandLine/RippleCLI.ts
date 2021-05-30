import { Package } from "../Ripple/Package";
import { error, log } from "console";
import { promisify } from "util";
import * as cp from "child_process";
const exec = promisify(cp.exec);

export const pkg: Package = require(__dirname + "/../../package.json");
const programFile = "out/Program.js";
const watchingExts = [".ts", ".js", ".json"];
const nodemonOpts = ["--trace-warnings", `-e ${watchingExts.join(",")}`];

export class RippleCLI {
    public static Update() {
        const pkgName = `${pkg.name}-${pkg.version}`;
        log("Updating Ripple CLI...");
        exec("npm pack")
            .then(() => {
                log("Installing new version globally...");
                exec(`npm i ${pkgName}.tgz --save -g`)
                    .then(() => {
                        log("Successfully updated Ripple CLI!")
                        exec(`rm ${pkgName}.tgz`)
                            .catch(err => log("WARN: Failed to remove tarball.", err));
                    }).catch(err => log("FATAL: Failed to install tarball globally.", err))
            }).catch(err => log("FATAL: Failed to pack into tarball.", err));
    }

    public static Start() {
        this.RunIndefiniteCommand(`nodemon ${programFile} ${nodemonOpts.join(" ")}`, "Ripple")
            .then(log)
            .catch(error);
    }

    private static async RunIndefiniteCommand(command: string, programAlias: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const child = exec(command)
                .then(({ stdout, stderr }) => {
                    if (stderr)
                        reject(stderr);
                    else
                        resolve(`${programAlias} exited without an error.\nOut: ${stdout}`);
                }).catch(reject);
        
            setTimeout(() => 
                resolve(`${programAlias} is now running!`), 
            1000);
        })
    }
}