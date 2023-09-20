function _bem(prefixName, blockSuffix, element, modifier) {
    if (blockSuffix) {
        prefixName += `-${blockSuffix}`;
    }
    if (element) {
        prefixName += `__${element}`;
    }
    if (modifier) {
        prefixName += `--${modifier}`;
    }
    return prefixName;
}
function createBEM(prefixName) {
    const b = (blockSuffix = "") => _bem(prefixName, blockSuffix, "", "");
    const e = (element = "") => element ? _bem(prefixName, "", element, "") : "";
    const m = (modifier = "") => modifier ? _bem(prefixName, "", "", modifier) : "";
    const be = (blockSuffix = "", element = "") => blockSuffix && element ? _bem(prefixName, blockSuffix, element, "") : "";
    const bm = (blockSuffix = "", modifier = "") => blockSuffix && modifier ? _bem(prefixName, blockSuffix, "", modifier) : "";
    const em = (element = "", modifier = "") => element && modifier ? _bem(prefixName, "", element, modifier) : "";
    const bem = (blockSuffix = "", element = "", modifier = "") => blockSuffix && element && modifier
        ? _bem(prefixName, blockSuffix, element, modifier)
        : "";
    const is = (name, state) => (state ? `is-${name}` : "");
    return {
        b,
        e,
        m,
        be,
        bm,
        em,
        bem,
        is
    };
}
export function createNamespace(name) {
    const prefixName = `s-${name}`;
    return createBEM(prefixName);
}
