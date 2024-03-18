function lddGroupNames(name) {
    return name
        .replace('_and_', ' / ')
        .replace('_', ' ')
        ;
}

export {
    lddGroupNames
}