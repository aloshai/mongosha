class Serialize {
    /**
     * @param {String} path 
     * @param {any} value 
     * @param {Object} obj 
     */
    static set(path, value, obj = {}){
        let targets = path.split(".");
        let ref = obj;
        for (let index = 0; index < targets.length - 1; index++) {
            const target = targets[index];
            if(ref[target]) ref = ref[target];
            else ref = ref[target] = {};
        }
        ref[targets[targets.length - 1]] = value;
        return obj;
    }

    /**
     * @param {String} path 
     * @param {Object} obj 
     */
    static get(path, obj = {}){
        let targets = path.split(".");
        let ref = obj;
        let value = undefined;

        for (let index = 0; index < targets.length; index++) {
            const target = targets[index];
            if(ref[target]) ref = ref[target];
            else break;
        }
        value = ref;
        return value;
    }
}

module.exports = Serialize;