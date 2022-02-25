import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";    
import * as core from "@actions/core";
import * as io from "@actions/io";

const fsPromises = fs.promises;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sourceJsonPath = path.join(__dirname, core.getInput("source-json"));
const targetFolderPath = path.join(__dirname, core.getInput("target-folder"));

try {
    const json = await fsPromises.readFile(sourceJsonPath)
    const dependencies = JSON.parse(json);

    // Recursive must be true for directories
    const options = { recursive: true, force: false }

    for (const dep of dependencies) {
        const [from, to] = dep;
        const path = path.join(targetFolderPath, to);
        await io.cp(from, targetFolderPath, options);
    }
} catch (err) {
    core.setFailed(`Action failed with error ${err}`);
}
