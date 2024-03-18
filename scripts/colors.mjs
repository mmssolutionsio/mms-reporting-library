import { createRequire } from "node:module"
const require = createRequire(import.meta.url);
const colors = require("colors/safe")

colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'cyan',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red',
    folder: 'brightRed',
    file: 'brightBlue'
})

export default colors
export {
    colors
}