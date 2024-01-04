/**
 * Deletes each key-value pair from the map for which the callback function returns true.
 *
 * @param {function} callback - The callback function to execute on each key-value pair. The function should return true to delete the pair, or false to keep it.
 * @param {any} thisArg - Optional. The value to use as `this` when executing the callback function.
 * @return {Map} - The Map object after deleting the key-value pairs.
 */
Map.prototype.deleteEach = function (callback, thisArg) {
    if (typeof callback !== "function")
        throw new TypeError("Map.deleteEach(): Missing callback function");

    var iterator = this.entries();
    var entry = iterator.next();

    while (!entry.done) {
        var key = entry.value[0];
        var value = entry.value[1];

        if (callback.call(thisArg, value, key, this)) {
            this.delete(key, value);
        }
        entry = iterator.next();
    }

    return this;
};