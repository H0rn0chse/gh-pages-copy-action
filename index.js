import fs from "fs";
import path from "path";
import * as core from "@actions/core";
import * as io from "@actions/io";

const fsPromises = fs.promises;

const workRoot = path.join("./");
const sourceJsonPath = path.join(workRoot, core.getInput("source-json"));
const targetFolderPath = path.join(workRoot, core.getInput("target-folder"));

try {
    const json = await fsPromises.readFile(sourceJsonPath)
    const dependencies = JSON.parse(json);

    // Recursive must be true for directories
    const options = { recursive: true, force: false }

    for (const dep of dependencies) {
        const [from, to] = dep;

        const fromPath = path.resolve(workRoot, from);
        const toPath = path.resolve(targetFolderPath, to);

        core.info(`Root input "${core.getInput("root")}"`);
        core.info(`Root "${workRoot}"`);
        core.info(`TargetFolder "${targetFolderPath}"`);
        core.info(`Copying "${fromPath}" to "${toPath}"`);

        await io.cp(fromPath, toPath, options);
    }
} catch (err) {
    core.setFailed(`Action failed with error ${err}`);
}
