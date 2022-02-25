const fs = require("fs");
const path = require("path");
const core = require("@actions/core");
const io = require("@actions/io");

const fsPromises = fs.promises;
const workRoot = path.join(process.env.GITHUB_WORKSPACE);

(async () => {
    const sourceJsonPath = path.join(workRoot, core.getInput("source-json"));
    const targetFolderPath = path.join(workRoot, core.getInput("target-folder"));

    try {
        const json = await fsPromises.readFile(sourceJsonPath)
        const dependencies = JSON.parse(json);

        // Recursive must be true for directories
        const options = { recursive: true, force: false }

        for (const dep of dependencies) {
            const [from, to] = dep;
            await io.cp(path.join(workRoot, from), path.join(targetFolderPath, to), options);
        }
    } catch (err) {
        core.setFailed(`Action failed with error ${err}`);
    }
})()
