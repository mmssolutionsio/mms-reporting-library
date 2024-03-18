import { writeFileSync, readFileSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import { colors } from './colors.mjs';

function mapValues( values ) {
    let r = {}
    if ( Array.isArray( values ) ) {
        for (let x = 0; x < values.length; x++) {
            if (typeof values[x].name === "undefined") {
                if ( !Array.isArray( r ) ) {
                    r = [];
                }
                r.push(mapValues(values[x]));
            } else {
                r[values[x].name] = mapValues(values[x]);
            }
        }
    } else if ( typeof values === "object" ) {
        for ( const label in values ) {
            if ( label !== "name" ) {
                r[label] = mapValues(values[label]);
            }
        }
    } else {
        if ( values === "" ) {
            return `""`;
        }
        return values;
    }
    return r;
}

function writeTypographyScss(typography) {
    let r = [`@use "config";`, `@forward "@multivisio/nswow/scss/typography";`];
    if (typography) {
        if ( typography.typography ) {
            let o = [];

            for ( const typo in typography.typography ) {
                o.push(`@mixin ${typo}($margins: false) {`);
                o.push(`  @include typography.get("${typo}", $margins);`);
                o.push(`}\n`);
            }
            if (o.length) {
                r.push(`@use "@multivisio/nswow/scss/typography";\n`);
                r.push(o.join(`\n`));
            }
        }
    }
    return r.join(`\n`);
}

function writeColorsScss(colors) {
    let r = [`@use "config";`, `@forward "@multivisio/nswow/scss/colors";`];
    if ( colors ) {
        if (colors.colors) {
            let o = [];

            for ( const color in colors.colors ) {
                o.push(`@function ${color}() {`);
                o.push(`  @return colors.get("${color}");`);
                o.push(`}\n`);
            }

            if (o.length) {
                r.push(`@use "@multivisio/nswow/scss/colors";\n`);
                r.push(o.join(`\n`));
            }
        }
    }
    return r.join(`\n`);
}

function hasCommasOutsideOfParentheses(text) {
    let depth = 0;
    for (let char of text) {
        if (char === '(') depth++;
        else if (char === ')') depth--;
        else if (char === ',' && depth === 0) return true;
    }
    return false;
}

function hasPointsOutsideOfParentheses(text) {
    let depth = 0;
    for (let char of text) {
        if (char === '(') depth++;
        else if (char === ')') depth--;
        else if (char === '.' && depth === 0) return true;
    }
    return false;
}

function makeScssVariables( values, indent = 2 ) {
    let r = [];
    if (typeof values === "object") {
        r.push(`(`)
        let v = [];
        for ( const variables in values ) {
            if (Array.isArray(values)) {
                v.push(`${' '.repeat( indent + 2)}var${variables}: ${makeScssVariables(values[variables], ( indent + 2 ))}`);
            } else {
                v.push(`${' '.repeat( indent + 2)}${variables}: ${makeScssVariables(values[variables], ( indent + 2 ))}`);
            }
        }
        r.push(v.join(`,\n`));
        r.push(`${' '.repeat(indent)})`);
    } else {
        if (
            typeof values === "string" &&
            values !== `""` &&
            (
                hasPointsOutsideOfParentheses(values) ||
                hasCommasOutsideOfParentheses(values)
            )
        ) {
            values = `\"${values.replaceAll('"','\\"')}\"`;
        }
        return values
    }
    return r.join(`\n`);
}

async function beaver(verbose = 0) {
    const configJson = JSON.parse(
        await readFileSync(resolve(process.cwd(),'./nswow.config.json'))
    );
    const nswowPath = resolve(process.cwd(), './nswow');

    if (typeof verbose === "boolean") {
        verbose = verbose ? 1 : 0;
    }

    if (typeof configJson.system === "undefined") {
        configJson.system = {};
    }

    if (typeof configJson.system.environment === "undefined") {
        configJson.system.environment = process.env.NODE_ENV;
    }

    if (typeof configJson.fonts !== "undefined") {
        const fontBasePath = configJson.fonts["font-base-path"] ?? "";
        if (typeof configJson.fonts.fonts !== "undefined") {
            for (let x = 0; x < configJson.fonts.fonts.length; x++) {
                let font = configJson.fonts.fonts[x];
                if (typeof font === "string") {
                    configJson.fonts.fonts[x] = JSON.parse(resolve(process.cwd(), `${fontBasePath}/${font}/styles.json`));
                }
            }
        }
    }

    const map = {};

    for (const file in configJson) {
        map[file] = {};
        for (const variable in configJson[file]) {
            map[file][variable] = mapValues(configJson[file][variable]);
        }
    }

    let configOutput = [];
    ['system', 'fonts', 'meta', 'grid', 'colors', 'typography', 'helpers'].forEach(file => {
        if (typeof map[file] !== "undefined") {
            const o = [];
            o.push(`@use "@multivisio/nswow/scss/${file}/variables.scss" as ${file}Variables with (`);
            let v = [];
            for (const variable in map[file]) {
                v.push(`  $${variable}: ${makeScssVariables(map[file][variable])}`);
            }
            o.push(v.join(`,\n`));
            o.push(');\n');
            configOutput.push(o.join(`\n`));
        }
    })

    configOutput = configOutput.join(`\n`);
    const configFile = `${nswowPath}/config.scss`;
    writeFileSync(
        configFile,
        configOutput
    );

    const typographyFile = `${nswowPath}/typography.scss`;
    const typographyOutput = writeTypographyScss(map.typography);
    writeFileSync(
        typographyFile,
        typographyOutput
    );

    const colorsFile = `${nswowPath}/colors.scss`;
    const colorsOutput = writeColorsScss(map.colors);
    writeFileSync(
        colorsFile,
        colorsOutput
    );

    if (verbose > 0) {
        console.log(colors.info(`\nThe following files has been written.\n`));

        console.log(colors.bgWhite(colors.file(relative(process.cwd(), configFile))));
        if (verbose > 1) {
            console.log(colors.prompt(`\n` + configOutput + `\n`));
        }

        console.log(colors.bgWhite(colors.file(relative(process.cwd(), typographyFile))));
        if (verbose > 1) {
            console.log(colors.prompt(`\n` + typographyOutput + `\n`));
        }

        console.log(colors.bgWhite(colors.file(relative(process.cwd(), colorsFile))));
        if (verbose > 1) {
            console.log(colors.prompt(`\n` + colorsOutput + `\n`));
        }
        console.log("")
    }
}

export {
    beaver
}