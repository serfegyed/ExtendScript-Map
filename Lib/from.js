/**
 * Creates a new Map by applying a mapping function to the elements of an iterable object.
 *
 * @param {Object|Array|Map} iterable - The iterable object whose elements will be mapped.
 * @param {Function} mapFunc - The function to be applied to each element of the iterable. (default: identity function)
 * @param {Object} thisArg - The value to use as `this` when executing the map function.
 * @return {Map} A new Map object containing the mapped key-value pairs.
 */
Map.from = function (iterable, mapFunc, thisArg) { // ChatGPT refactor
    if (iterable == null || typeof iterable !== 'object') {
        throw new TypeError(iterable + " is not an object.");
    }

    if (mapFunc == null) {
        mapFunc = function (item) { return item; };
    }

    var result = new Map();

    if (iterable instanceof Array) {
        for (var i = 0; i < iterable.length; i++) {
            var entry = iterable[i];
            if (entry instanceof Array) {
                var elem = mapFunc.call(thisArg, entry, i);
                result.set(elem[0], elem[1]);
            }
        }
    } else if (iterable instanceof Map) {
        var iterator = iterable.entries();
        var entry = iterator.next();
        while (!entry.done) {
            var elem = mapFunc.call(thisArg, [entry.value[0], entry.value[1]]);
            result.set(elem[0], elem[1]);
            entry = iterator.next();
        }
    } else {
        for (var key in iterable) {
            if (iterable.hasOwnProperty(key)) {
                var pair = mapFunc.call(thisArg, [key, iterable[key]]);
                result.set(pair[0], pair[1]);
            }
        }
    }

    return result;
};