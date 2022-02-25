const fs = require("fs");
const path = require("path");
const core = require("@actions/core");
const io = require("@actions/io");

const fsPromises = fs.promises;

(async () => {
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
})()
