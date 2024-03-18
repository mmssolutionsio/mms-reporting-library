function defineConfig(config) {
    return Object.assign({
        output: {
            Dir: '.output',
            App: 'app',
            LivingDocs: "livingdocs",
            Pdf: "pdf",
            Word: "word"
        }
    }, config)
}

export {
    defineConfig
}