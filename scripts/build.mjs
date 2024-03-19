import { resolve } from 'node:path';
import {statSync, writeFileSync, readFileSync, mkdirSync, readdirSync, createWriteStream, rmSync} from 'node:fs';
import { createRequire } from 'node:module';
import { glob } from "glob";
import { beaver } from "./beaver.mjs";
import { build as viteBuild } from 'vite';
import { build as finalizeLdd } from "./migrate-livingdocs-build/bin/build.js";
import { fileURLToPath, URL } from 'node:url'

const CWD = process.cwd();
const nswowPath = resolve(CWD, '.nswow');
const outputPath = resolve(CWD, '.output');
const require = createRequire(import.meta.url);

const { Input } = require("enquirer");

let foldersChecked = false;

async function checkFolders() {
    if (!foldersChecked) {
        foldersChecked = true;
        try {
            await statSync(nswowPath);
        } catch (e) {
            await mkdirSync(nswowPath);
        }
        try {
            await statSync(outputPath);
        } catch (e) {
            await mkdirSync(outputPath);
        }
    }
    return true;
}

async function cleanOutput() {
    await checkFolders();
    const output = readdirSync(outputPath);
    for (let i = 0; i < output.length; i++) {
        await rmSync(`${outputPath}/${output[i]}`, {force: true, recursive: true })
    }
    return true;
}

async function buildApp() {
    await checkFolders();
    return await viteBuild();
}

async function zipApp() {
    await checkFolders();
    const archiver = require('archiver');
    const output = createWriteStream(outputPath + '/app.zip');
    const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
    });
    output.on('close', function() {
        console.log('Create zip ' + outputPath + '/app.zip');
        console.log(archive.pointer() + ' total bytes');
    });
    output.on('end', function() {
        console.log('Data has been drained');
    });
    archive.on('warning', function(err) {
        if (err.code === 'ENOENT') {
            console.error(err)
        } else {
            // throw error
            throw err;
        }
    });
    archive.on('error', function(err) {
        throw err;
    });
    archive.pipe(output);
    archive.directory(outputPath + '/app/', false);
    archive.finalize();
}

async function buildPdf() {
    await checkFolders();
    const input = resolve(CWD, 'pdf.html');
    try {
        await statSync(input);
    } catch (e){return true;}
    try {
        const { alias } = await import(resolve(CWD, './alias.js'));
        return await viteBuild({
            build: {
                outDir: './.output/pdf',
                rollupOptions: {
                    input: {
                        pdf: input
                    },
                    output: {
                        entryFileNames: `[name].js`,
                        chunkFileNames: `[name].js`,
                        assetFileNames: `[name].[ext]`,
                    }
                },
                copyPublicDir: false,
            },
            resolve: {
                alias: alias
            }
        })
    } catch (e) {
        console.error(e);
        return false;
    }
}

async function buildLdd(version) {
    await checkFolders();

    const lddJsonFile = resolve(CWD, './livingdocs.config.json');
    const lddJson = JSON.parse(
        await readFileSync(lddJsonFile)
    );

    if (version) {
        lddJson.version = version;
        const writeJson = require('write-json');
        writeJson.sync(lddJsonFile, lddJson);
    }

    const input = resolve(CWD, 'ldd.html');
    try {
        await statSync(input);
    } catch (e){return true;}
    try {
        await writeFileSync(`${outputPath}/v${lddJson.version}.txt`, '');
        const { alias } = await import(resolve(CWD, './alias.js'));
        return await viteBuild({
            build: {
                outDir: './.output/ldd',
                rollupOptions: {
                    input: {
                        ldd: input
                    },
                    output: {
                        entryFileNames: `assets/[name].js`,
                        chunkFileNames: `assets/[name].js`,
                        assetFileNames: `assets/[name].[ext]`,
                    }
                },
                copyPublicDir: false,
            },
            resolve: {
                alias: alias
            }
        })
            .then(async () => {
                const lddJsonFile = resolve(CWD, './livingdocs.config.json');
                const lddJson = JSON.parse(
                    await readFileSync(lddJsonFile)
                );

                const assetsPath = outputPath + '/ldd/assets';
                const assetsFiles = await readdirSync( assetsPath );
                let action = false;
                for (let i = 0; i < assetsFiles.length; i++) {
                    const file = assetsFiles[i];
                    if (file.endsWith('.css')) {
                        const path = './assets/' + file;
                        if (!lddJson.assets.css.includes(path)) {
                            action = true;
                            lddJson.assets.css.push(path)
                        }
                    }
                    if (file.endsWith('.js')) {
                        const path = './assets/' + file;
                        if (!lddJson.assets.js.includes(path)) {
                            action = true;
                            lddJson.assets.js.push(path)
                        }
                    }
                }
                if (action) {
                    const writeJson = require('write-json');
                    writeJson.sync(lddJsonFile, lddJson);
                }
                return true;
            })
            .then(async () => {
                return await finalizeLdd();
            })
    } catch (e) {
        console.error(e);
        return false;
    }
}

async function buildWord() {
    await checkFolders();
    const { alias } = await import(resolve(CWD, './alias.js'));
    const input = resolve(CWD, 'word.html');
    try {
        await statSync(input);
    } catch (e){return true;}
    try {
        return await viteBuild({
            build: {
                outDir: './.output/word',
                rollupOptions: {
                    input: {
                        word: input
                    },
                    output: {
                        entryFileNames: `[name].js`,
                        chunkFileNames: `[name].js`,
                        assetFileNames: `[name].[ext]`,
                    }
                },
                copyPublicDir: false,
            },
            resolve: {
                alias: alias
            }
        })
    } catch (e) {
        console.error(e);
        return false;
    }
}

async function build() {
    await checkFolders();
    const lddJsonFile = resolve(CWD, './livingdocs.config.json');
    const lddJson = JSON.parse(
        await readFileSync(lddJsonFile)
    );

    const prompt = new Input({
        message: 'Livingdocs version',
        initial: lddJson.version
    });

    prompt.run()
        .then(async version => {
            await cleanOutput()
                .then(async () => {
                    beaver(1)
                        .then(async () => {
                            await mapScss()
                                .then(async () => {
                                    await mapLdd()
                                        .then(async () => {
                                            await buildApp()
                                                .then(async () => {
                                                        await buildPdf()
                                                            .then(async () => {
                                                                await buildWord()
                                                                    .then(async () => {
                                                                        await buildLdd(version)
                                                                            .then(async () => {
                                                                                await zipApp()
                                                                            })
                                                                    })
                                                            })
                                                    }
                                                )
                                        })

                                })
                        })
                })
        })
        .catch(console.log);
}

async function mapScss() {
    await checkFolders();
    try {
        const relativePathToRoot = '../';

        const output = {
            app: [],
            ldd: [],
            pdf: [],
            word: []
        }

        const mainFiles = await glob(resolve(process.cwd(),'./src/assets/scss/*.scss'), {
            withFileTypes: true
        });

        let f = mainFiles.find( p=> {
            return p.name === 'general.scss';
        });

        if (f) {
            output.app.push( relativePathToRoot + f.relative() );
            output.ldd.push( relativePathToRoot + f.relative() );
            output.pdf.push( relativePathToRoot + f.relative() );
            output.word.push( relativePathToRoot + f.relative() );
        }

        for ( let x = 0; x < mainFiles.length; x++ ) {
            if ( mainFiles[x].name === 'app.scss' ) {
                output.app.push( relativePathToRoot + mainFiles[x].relative() );
            }
            if ( mainFiles[x].name === 'ldd.scss' ) {
                output.ldd.push( relativePathToRoot + mainFiles[x].relative() );
            }
            if ( mainFiles[x].name === 'pdf.scss' ) {
                output.pdf.push( relativePathToRoot + mainFiles[x].relative() );
            }
            if ( mainFiles[x].name === 'word.scss' ) {
                output.word.push( relativePathToRoot + mainFiles[x].relative() );
            }
        }

        const livingdocs = await glob(resolve(process.cwd(),'./livingdocs/**/*'), { maxDepth: 3, withFileTypes: true });
        livingdocs.sort((a, b) => {
            const valueA = a.relative().toUpperCase();
            const valueB = b.relative().toUpperCase();
            if (valueA < valueB) {
                return -1;
            }
            if (valueA > valueB) {
                return 1;
            }
            return 0;
        })

        for ( let x = 0; x < livingdocs.length; x++ ) {
            const p = livingdocs[x];
            try {
                const general = await statSync(p.fullpath() + '/general.scss');
                output.app.push(relativePathToRoot + p.relative() + '/general.scss');
                output.ldd.push(relativePathToRoot + p.relative() + '/general.scss');
                output.pdf.push(relativePathToRoot + p.relative() + '/general.scss');
                output.word.push(relativePathToRoot + p.relative() + '/general.scss');
            } catch (e) {}

            const types = ['app', 'ldd', 'pdf', 'word'];

            for (let i = 0; i < types.length; i++) {
                const type = types[i];
                try {
                    const f = await statSync(p.fullpath() + '/' + type + '.scss');
                    output[type].push(relativePathToRoot + p.relative() + '/' + type + '.scss');
                } catch (e) {}
            }
        }

        await writeFileSync(`${CWD}/.nswow/app.scss`, `@import "nswow/core-styles";\n@import "` + output.app.join(`";\n@import "`) + '";');
        await writeFileSync(`${CWD}/.nswow/ldd.scss`, `@import "nswow/core-styles";\n@import "` + output.ldd.join(`";\n@import "`) + '";');
        await writeFileSync(`${CWD}/.nswow/pdf.scss`, `@import "nswow/core-styles";\n@import "` + output.pdf.join(`";\n@import "`) + '";');
        await writeFileSync(`${CWD}/.nswow/word.scss`, `@import "nswow/core-styles";\n@import "` + output.word.join(`";\n@import "`) + '";');

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function mapLdd() {
    await checkFolders();
    try {
        const writeJson = require('write-json');
        const packageJsonFile = resolve(CWD, './package.json');
        const lddJsonFile = resolve(CWD, './livingdocs.config.json');
        const packageJson = JSON.parse(
            await readFileSync(packageJsonFile)
        );
        const lddJson = JSON.parse(
            await readFileSync(lddJsonFile)
        );
        lddJson.name = packageJson.name;

        const propertiesFiles = await glob(resolve(CWD, './livingdocs/**/properties.json'));
        const mapProperties = {};
        for (let i = 0; i < propertiesFiles.length; i++) {
            const properties = JSON.parse(readFileSync(propertiesFiles[i]));
            const oKeys = Object.keys(properties);
            for (let j = 0; j < oKeys.length; j++) {
                mapProperties[oKeys[j]] = properties[oKeys[j]];
            }
        }
        lddJson.componentProperties = mapProperties;

        const groupsPath = resolve(CWD, './livingdocs');
        const groups = readdirSync(groupsPath);
        const keepGroups = [];

        for ( let x = 0; x < groups.length; x++) {
            const group = groups[x];
            const groupName = group
                .replace('_and_', ' / ')
                .replace('_', ' ')
            ;

            try {
                const stat = statSync(`${groupsPath}/${group}`);
                if (stat.isDirectory()) {
                    const components = [];
                    const c = readdirSync(`${groupsPath}/${group}`);
                    for (let j = 0; j < c.length; j++) {
                        const component = c[j];
                        const stat = statSync(`${groupsPath}/${group}/${component}`)
                        if (stat.isDirectory()) {
                            components.push(component);
                        }
                    }
                    if (components.length) {
                        keepGroups.push(groupName);
                        const i = lddJson.groups.find(g=>{
                            return g.label === groupName;
                        });
                        if (i) {
                            const newComponents = [];
                            for (let j = 0; j < i.components.length; j++) {
                                const index = components.indexOf(i.components[j]);
                                if ( index !== -1 ) {
                                    newComponents.push(components[index]);
                                    components.splice(index,1);
                                }
                            }
                            for (let j = 0; j < components.length; j++) {
                                newComponents.push(components[j]);
                            }

                            i.components = newComponents
                        } else {
                            lddJson.groups.push({
                                label: groupName,
                                components: components
                            })
                        }
                    }
                } else {
                    rmSync(`${groupsPath}/${group}`)
                }
            } catch (e) {
                console.log(e)
                return false;
            }
        }

        const newMap = [];
        for (let i = 0; i < lddJson.groups.length; i++) {
            const c = lddJson.groups[i];
            if (keepGroups.includes(c.label)) {
                newMap.push(c);
            }
        }
        lddJson.groups = newMap;
        writeJson.sync(lddJsonFile, lddJson);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

async function map() {
    await checkFolders();
    await mapScss().then( async () => await mapLdd() );
}

export {
    build,
    map,
    mapScss,
    mapLdd
}