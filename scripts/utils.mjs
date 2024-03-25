import { resolve } from "node:path";
import { readFileSync } from "node:fs";
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const writeJson = require('write-json');

function lddGroupNames(name) {
    return name
        .replace('_and_', ' / ')
        .replace('_', ' ')
        ;
}

async function readPackageJson() {
    const file = resolve(process.cwd(), './package.json');
    return JSON.parse(
        await readFileSync(file)
    );
}

async function writePackageJson(config){
    if (config) {
        const file = resolve(process.cwd(), './package.json');
        writeJson.sync(file, config);
    }
    return true;
}

async function readLivingDocsJson() {
    const file = resolve(process.cwd(), './livingdocs.config.json');
    return JSON.parse(
        await readFileSync(file)
    );
}

async function writeLivingDocsJson(config) {
    if (config) {
        const file = resolve(process.cwd(), './livingdocs.config.json');
        writeJson.sync(file, config);
    }
    return true;
}

async function readNsWowJson() {
    const file = resolve(process.cwd(), './nswow.config.json');
    return JSON.parse(
        await readFileSync(file)
    );
}

async function writeNsWowJson(config) {
    if (config) {
        const file = resolve(process.cwd(), './nswow.config.json');
        writeJson.sync(file, config);
    }
    return true;
}

export {
    writeJson,
    lddGroupNames,
    readPackageJson,
    writePackageJson,
    readLivingDocsJson,
    writeLivingDocsJson,
    readNsWowJson,
    writeNsWowJson
}