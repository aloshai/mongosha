/**
 * @param {String} path
 * @param {any} value
 * @param {Object} obj
 */
function set(path, value, obj = {}) {
    let targets = path.split(".");
    let ref = obj;
    for (let index = 0; index < targets.length - 1; index++) {
        const target = targets[index];
        if (ref[target]) ref = ref[target];
        else ref = ref[target] = {};
    }
    ref[targets[targets.length - 1]] = value;
    return obj;
}

/**
 * @param {String} path
 * @param {Object} obj
 */
function get(path, obj = {}) {
    if (!obj || (obj && obj == null)) return undefined;
    let targets = path.split(".");
    let ref = obj;
    let value;

    for (let index = 0; index < targets.length; index++) {
        const target = targets[index];
        if (ref[target]) ref = ref[target];
        else {
            ref = undefined;
            break;
        }
    }
    value = ref;
    return value;
}


module.exports = {
    get,
    set
};