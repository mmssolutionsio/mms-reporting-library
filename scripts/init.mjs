import { resolve, dirname } from "node:path";
import fs from "fs-extra";
import { statSync, writeFileSync } from "node:fs";
import { fileURLToPath } from 'node:url';

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