/**
 * Adds elements to the map from an iterable.
 *
 * @param {Object|Array|Map} iterable - The iterable to initialize the map from.
 * @throws {TypeError} If the iterable is null or undefined.
 * @throws {TypeError} If the iterable is not an object.
 * @throws {TypeError} If the iterable contains invalid entries.
 * @return {Map} The map instance with the values from the iterable.
 * @external Map.prototype.entries
 */
Map.prototype.from = function (iterable) {
    if (iterable === null || iterable === undefined) {
        throw new TypeError(iterable + " is not an object.");
    }

    if (iterable instanceof Array) {
        for (var i = 0; i < iterable.length; i++) {
            var entry = iterable[i];
            if (entry instanceof Array) {
                this.set(entry[0], entry[1]);
            }
        }

    } else if (iterable instanceof Map) {
        var iterator = iterable.entries();
        var entry = iterator.next();
        while (!entry.done) {
            this.set(entry.value[0], entry.value[1]);
            entry = iterator.next();
        }

    } else {
        for (var key in iterable) {
            if (iterable.hasOwnProperty(key)) {
                this.set(key, iterable[key]);
            }
        }
    };

    return this;
};