/**
 * Iterates over all key-value pairs in the map and applies the given function to each pair.
 * If the function returns false for any pair, the method returns false. Otherwise, it returns true.
 *
 * @param {function} callback - The function to apply to each key-value pair.
 *                       It takes three arguments: the value, the key, and the map.
 * @param {Object} thisArg - Optional. The value to use as this when executing the function.
 * @return {boolean} Returns true if the function returns true for all key-value pairs,
 *                   otherwise returns false.
 * @external Map.prototype.entries
 */
Map.prototype.every = function (callback, thisArg) {
    if (typeof callback !== "function")
        throw new TypeError("Map.every(): Missing callback function");

    var iterator = this.entries();
    var entry = iterator.next();

    while (!entry.done) {
        var key = entry.value[0];
        var value = entry.value[1];

        if (!callback.call(thisArg, value, key, this)) {
            return false;
        }
        entry = iterator.next();
    }

    return true;
};