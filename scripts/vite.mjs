import {beaver} from './beaver.mjs';
import {map, mapLdd} from './build.mjs';

function nswowWatcher() {
    return {
        name: "nswow-watcher",
        configureServer(server) {
            server.watcher.on("change", path => {
                if (
                    path.endsWith("/nswow.config.json")
                ) {
                    beaver();
                }

                if (
                    path.endsWith("/properties.json")
                ) {
                    mapLdd();
                }
            })
            server.watcher.on("add", path => {
                if (
                    path.endsWith("/general.scss") ||
                    path.endsWith("/app.scss") ||
                    path.endsWith("/ldd.scss") ||
                    path.endsWith("/pdf.scss") ||
                    path.endsWith("/word.scss")
                ) {
                    map();
                }
            })
            server.watcher.on("unlink", path => {
                if (
                    path.endsWith("/general.scss") ||
                    path.endsWith("/app.scss") ||
                    path.endsWith("/ldd.scss") ||
                    path.endsWith("/pdf.scss") ||
                    path.endsWith("/word.scss") ||
                    path.endsWith("/properties.json")
                ) {
                    map();
                }
            })
        },
    }
}

export {
    nswowWatcher
}