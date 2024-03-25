import { resolve, dirname } from "node:path";
import fs from "fs-extra";
import { statSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import writeJson from "write-json";

const require = createRequire(import.meta.url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
async function init(folder, options){
    const projectPath = resolve(process.cwd(), folder);

    try {
        const stat = statSync(projectPath);
        console.error(`Folder ${projectPath} already exist!`);
    } catch (e) {
        await fs.copy(resolve(__dirname,"../dev/"), projectPath)
            .then(async () => {

                const packageJsonFile = `${projectPath}/package.json`;
                const packageJson = JSON.parse(
                    await readFileSync(packageJsonFile)
                )
                packageJson.name = folder;
                const writeJson = require('write-json');
                writeJson.sync(packageJsonFile, packageJson);

                await writeFileSync(`${projectPath}/.gitignore`, `/.output/\n/.nswow/\n/node_modules/`)
                console.log(`Project has created`);
                console.log(`cd ${folder}`);
                console.log(`npm install`);
            });
    }
}

export {
    init
}