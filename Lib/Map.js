#include '..\\External\\external.js';

/*************************************************************************************/
/**
 * @description Map class - ExtendScript (ES3)
 *
 * A lightweight Map class.
 *
 * @author Egyed Serf
 * @license MIT
 *
 * Methods for the Map class:
 * - isMap()    - Checks if an object is a Map.
 * - isEmpty()  - Determines whether the given parameter is an empty Map.
 * - set()      - Sets the value of a key in the map.
 * - get()      - Retrieves a value from the map's data using the provided key.
 * - has()      - Checks if the given key exists in the map's data.
 * - delete()   - Deletes a key-value pair from the map.
 * - clear()    - Clears the map.
 * - keys()     - Returns a new iterator object that contains the keys in the map.
 * - values()   - Returns a new iterator object that contains the values in the map.
 * - entries()  - Returns a new iterator object that contains the key/value pairs in the map.
 * - toArray()  - Returns an array representation of the map.
 * - toString() - Returns a string representation of the map.
 * - forEach()  - Iterates through each element of the map and applies a callback function.
 * - includes() - Checks if the map instance includes a specific element.
 * - find()     - Finds the first element in the map that satisfies the provided testing function.
 * - findKey()  - Find the key that satisfies the given condition in the map.
 * - keyOf()    - Returns the first key associated with the specified search element in the map.
 * - some()     - Executes the provided callback function once for each key-value pair in the Map object.
 * - every()    - Iterates over all key-value pairs in the map and applies the given function to each pair.
 * - filter()   - Filters the elements of a Map object based on a provided callback function.
 * - mapValues()- Maps each value of the Map object using a callback function.
 * - mapKeys()  - Maps the keys of the map using a callback function.
 * - reduce()   - Reduce the Map to a single value by applying a callback function to each key-value pair.
 * - from()     - Adds elements to the map from an iterable.
 * 
 * @external:   isString(), sameValueZero(), Array.isArray()
 * 
 */
/*************************************************************************************/
/**
 * @description Map class - ExtendScript (ES3)
 *
 * A lightweight Map class.
 *
 * @author Egyed Serf
 * @license MIT
 */
function Map(iterable) {
    this._data = {};
    this.size = 0;

    if (Array.isArray(iterable)) {
        for (var i = 0; i < iterable.length; i++) {
            var entry = iterable[i];
            if (Array.isArray(entry)) {
                this.set(entry[0], entry[1]);
            };
        };
    };
}

/**
 * Checks if an object is a Map.
 *
 * @param {any} obj - The object to be checked.
 * @return {boolean} Returns true if the object is a Map, otherwise returns false.
 */
Map.isMap = function (obj) {
    return typeof obj === "object" && obj instanceof Map;
};

/**
 * Determines whether the given object is an empty Set.
 *
 * @param {Map} obj - The Map to check.
 * @throws {TypeError} Throws a TypeError if the parameter is not a Map.
 * @return {boolean} Returns true if the Map is empty, false otherwise.
 */
Map.isEmpty = function (obj) {
    if (!Map.isMap(obj)) throw new TypeError(obj.toString() + " is not a Map");
    return obj.size === 0;
};

/**
 * Sets the value of a key in the data object.
 *
 * @param {string} key - The key to set.
 * @param {*} value - The value to set for the key.
 */
Map.prototype.set = function (key, value) {
    if (!this.has(key)) {
        this.size++;
    }
    this._data[key] = value;
    return this;
};

/**
 * Retrieves a value from the object's data using the provided key.
 *
 * @param {string} key - The key to retrieve the value for.
 * @return {*} The value associated with the provided key.
 */
Map.prototype.get = function (key) {
    return this._data[key];
};

/**
 * Checks if the given key exists in the object's data.
 *
 * @param {string} key - The key to check for existence in the object's data.
 * @return {boolean} True if the object's data contains the given key, false otherwise.
 */
Map.prototype.has = function (key) {
    return this._data.hasOwnProperty(key);
};

/**
 * Deletes a key-value pair from the data object.
 *
 * @param {string} key - the key to delete
 */
Map.prototype.delete = function (key) {
    if (this.has(key)) {
        delete this._data[key];
        this.size--;
        return true;
    } else {
        return false;
    }
};

/**
 * Clears the data object.
 *
 */
Map.prototype.clear = function () {
    this._data = {};
    this.size = 0;
};

/**
 * Returns an iterator object that generates keys of the Map.
 *
 * @return {Object}
 */
Map.prototype.keys = function () {
    var keys = [];
    for (var key in this._data) {
        keys.push(key);
    }

    var index = 0;
    var length = keys.length;

    var iterator = {
        next: function () {
            if (index >= length)
                return {
                    done: true,
                    value: undefined,
                };
            else
                return {
                    done: false,
                    value: keys[index++],
                };
        },
    };
    return iterator;
};

/**
 * Returns an iterator object that generates values of the Map.
 *
 * @return {Object}
 */
Map.prototype.values = function () {
    var values = [];
    for (var key in this._data) {
        values.push(this._data[key]);
    }
    var index = 0;
    var length = values.length;

    var iterator = {
        next: function () {
            if (index >= length)
                return {
                    done: true,
                    value: undefined,
                };
            else
                return {
                    done: false,
                    value: values[index++],
                };
        },
    };
    return iterator;
};

/**
 * Returns an iterator object that generates key-value pairs of the Map.
 *
 * @returns {Object}
 */
Map.prototype.entries = function () {
    var arr = [];
    for (var key in this._data) {
        arr.push([key, this._data[key]]);
    }

    var index = 0;
    var length = arr.length;

    var iterator = {
        next: function () {
            if (index >= length)
                return {
                    done: true,
                    value: undefined,
                };
            else
                return {
                    done: false,
                    value: [arr[index][0], arr[index++][1]],
                };
        },
    };
    return iterator;
};

/**
 * Converts a Map object to an array based on the specified mode.
 *
 * @param {string} mode - The mode to determine which elements to include in the array. 
 *                        Valid values are 'keys', 'values'. If not specified, full entries are used.
 * @return {Array} The resulting array containing the elements of the Map object.
 */
Map.prototype.toArray = function (mode) {
    mode = (mode === 'keys' || mode === 'values' ? mode : undefined);
    var array = [];

    var iterator;
    if (mode === 'keys') {
        iterator = this.keys();
    } else if (mode === 'values') {
        iterator = this.values();
    } else {
        iterator = this.entries();
    }

    var currentValue = iterator.next();
    while (!currentValue.done) {
        array.push(currentValue.value);
        currentValue = iterator.next();
    }

    return array;
};

/**
 * Converts the data in the object to a string representation.
 *
 * @return {string} The string representation of the data in the object in {key: value} format.
 */
Map.prototype.toString = function () {
    var isFirst = true;
    var string = "";
    for (var key in this._data) {
        if (this._data.hasOwnProperty(key)) {
            if (!isFirst) {
                string += ", ";
            }
            string += "{" + key + "=>" + (isString(this._data[key]) ? '"' + this._data[key] + '"' : this._data[key]) + "}";
            isFirst = false;
        }
    }
    return "{" + string + "}";
};

/**
 * Iterates through each element of the object and applies a callback function.
 *
 * @param {function} callback - function to be called for each element in the object
 * @param {object} [thisArg=this] - object to use as 'this' when executing callback
 */
Map.prototype.forEach = function (callback, thisArg) {
    for (var key in this._data) {
        callback.call(thisArg, this._data[key], key, this);
    }
};

/**
 * Checks if the Map instance includes a specific element.
 *
 * @param {any} searchElement - The element to search for in the Map.
 * @return {boolean} Returns true if the element is found in the Map, otherwise returns false.
 */
Map.prototype.includes = function (searchElement) {
    if (!arguments.length) throw new TypeError('Map.includes(): Missing search element')
    var iterator = this.values();
    var currentItem = iterator.next();

    while (!currentItem.done) {
        if (sameValueZero(currentItem.value, searchElement)) {
            return true;
        }
        currentItem = iterator.next();
    };
    return false;
};

/**
 * Finds the first element in the map that satisfies the provided testing function.
 *
 * @param {function} callback - The testing function. It is called with three arguments: the value, the key, and the map itself.
 * @param {any} thisArg - Optional. The object to use as `this` when executing the testing function.
 * @return {any} The first element in the map that satisfies the provided testing function. If no element is found, `undefined` is returned.
 */
Map.prototype.find = function (callback, thisArg) {
    if (typeof callback !== "function")
        throw new TypeError("Map.find(): Missing callback function");
    var iterator = this.entries();
    var entry = iterator.next();
    while (!entry.done) {
        var key = entry.value[0];
        var value = entry.value[1];
        if (callback.call(thisArg, value, key, this)) {
            return value;
        }
        entry = iterator.next();
    }
    return undefined;
};

/**
 * Find the key that satisfies the given condition in the map.
 *
 * @param {function} callback - The condition function to be satisfied by the value, key, and map.
 * @param {object} thisArg - The value to use as "this" when executing the condition function.
 * @return {any} The key that satisfies the condition, or undefined if no key is found.
 */
Map.prototype.findKey = function (fn, thisArg) {
    var iterator = this.entries();
    var entry = iterator.next();
    while (!entry.done) {
        var key = entry.value[0];
        var value = entry.value[1];
        if (fn.call(thisArg, value, key, this)) {
            return key;
        }
        entry = iterator.next();
    }
    return undefined;
};

/**
 * Returns the first key associated with the specified search element in the map.
 *
 * @param {any} searchElement - The element to search for in the map.
 * @return {any} The key associated with the search element, or undefined if the element is not found.
 */
Map.prototype.keyOf = function (searchElement) {
    var iterator = this.entries();
    var entry = iterator.next();

    while (!entry.done) {
        var key = entry.value[0];
        var value = entry.value[1];
        if (sameValueZero(value, searchElement)) {
            return key;
        }
        entry = iterator.next();
    }
    return undefined;
};

/**
 * Executes the provided callback function once for each key-value pair in the Map object.
 *
 * @param {Function} callback - Function to execute for each element.
 * @param {Object} [thisArg] - Value to use as this when executing callback.
 * @return {boolean} Returns true if the callback function returns a truthy value for at least one key-value pair, otherwise false.
 */
Map.prototype.some = function (callback, thisArg) {
    if (typeof callback !== "function")
        throw new TypeError("Map.some(): Missing callback function");

    var iterator = this.entries();
    var entry = iterator.next();

    while (!entry.done) {
        var key = entry.value[0];
        var value = entry.value[1];
        if (callback.call(thisArg, value, key, this)) {
            return true;
        }
        entry = iterator.next();
    }
    return false;
};

/**
 * Iterates over all key-value pairs in the map and applies the given function to each pair.
 * If the function returns false for any pair, the method returns false. Otherwise, it returns true.
 *
 * @param {function} callback - The function to apply to each key-value pair.
 *                       It takes three arguments: the value, the key, and the map.
 * @param {Object} thisArg - Optional. The value to use as this when executing the function.
 * @return {boolean} Returns true if the function returns true for all key-value pairs,
 *                   otherwise returns false.
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

/**
 * Filters the elements of a Map object based on a provided callback function.
 *
 * @param {function} callback - The callback function used to test each element of the Map.
 *          It should return true to keep the element, or false otherwise.
 * @param {Object} thisArg - Optional. The value to use as `this` when executing the callback function.
 * @return {Map} A new Map object containing the key-value pairs that passed the test
 *          implemented by the callback function.
 */
Map.prototype.filter = function (callback, thisArg) {
    if (typeof callback !== "function")
        throw new TypeError("Map.filter(): Missing callback function");
    var filteredMap = new Map();
    var iterator = this.entries();
    var entry = iterator.next();

    while (!entry.done) {
        var key = entry.value[0];
        var value = entry.value[1];

        if (callback.call(thisArg, value, key, this)) {
            filteredMap.set(key, value);
        }
        entry = iterator.next();
    }

    return filteredMap;
};

/**
 * Maps each value of the Map object using a callback function.
 *
 * @param {Function} callback - The function to map each value. It accepts three arguments: value, key, and the Map object.
 * @param {Object} [thisArg] - An optional object to which the this keyword can refer inside the callback function.
 * @throws {TypeError} If the callback parameter is not a function.
 * @return {Map} A new Map object with the mapped values.
 */
Map.prototype.mapValues = function (callback, thisArg) {
    if (typeof callback !== "function")
        throw new TypeError("Map.mapValues(): Missing callback function");
    var newMap = new Map();
    var iterator = this.entries();
    var entry = iterator.next();

    while (!entry.done) {
        var key = entry.value[0];
        var value = entry.value[1];
        newMap.set(key, callback.call(thisArg, value, key, this));
        entry = iterator.next();
    }

    return newMap;
};

/**
 * Maps the keys of the map using a callback function.
 *
 * @param {function} callback - The callback function to apply to each key-value pair. The callback function takes three arguments: key, value, and the original map.
 * @param {Object} thisArg - An optional object to which the `this` keyword can refer inside the callback function.
 * @return {Map} - A new map with the updated keys.
 */
Map.prototype.mapKeys = function (callback, thisArg) {
    if (typeof callback !== "function")
        throw new TypeError("Map.mapKeys(): Missing callback function");
    var newMap = new Map();
    var iterator = this.entries();
    var entry = iterator.next();

    while (!entry.done) {
        var key = entry.value[0];
        var value = entry.value[1];
        newMap.set(callback.call(thisArg, key, value, this), value);
        entry = iterator.next();
    }

    return newMap;
};

/**
 * Reduce the Map to a single value by applying a callback function to each key-value pair.
 *
 * @param {Function} callback - The function to execute on each key-value pair, taking four arguments:
 *        - accumulator: The value previously returned in the last invocation of the callback,
 *                       or initialValue if provided.
 *        - value: The current value being processed.
 *        - key: The key of the current value being processed.
 *        - map: The Map object that the reduce method was called upon.
 * @param {*} initialValue - A value to use as the first argument to the first call of the callback.
 * @return {*} - The value that results from the reduction.
 * @throws {TypeError} - If the callback is not a function or if the Map is empty and no initialValue is provided.
 */
Map.prototype.reduce = function (callback, initialValue) {
    if (typeof callback !== "function")
        throw new TypeError("Map.reduce(): Callback must be a function");

    if (this.size === 0 && initialValue === undefined)
        throw new TypeError("Map.reduce(): Empty Map without an initial value");

    var iterator = this.entries();
    var entry = iterator.next();
    var accumulator = initialValue || undefined;

    if (!entry.done || !accumulator) {
        accumulator = entry.value[1];
        entry = iterator.next();
    }

    while (!entry.done) {
        var key = entry.value[0];
        var value = entry.value[1];
        accumulator = callback.call(this, accumulator, value, key, this);
        entry = iterator.next();
    }

    if (accumulator === undefined)
        throw new TypeError("Map.reduce(): Reducer function returns an invalid value");

    return accumulator;
};

/**
 * Adds elements to the map from an iterable.
 *
 * @param {Object|Array|Map} iterable - The iterable to initialize the map from.
 * @throws {TypeError} If the iterable is null or undefined.
 * @throws {TypeError} If the iterable is not an object.
 * @throws {TypeError} If the iterable contains invalid entries.
 * @return {Map} The map instance with the values from the iterable.
 */
Map.prototype.from = function (iterable) {
    if (iterable === null || iterable === undefined) {
        throw new TypeError(iterable + " is not an object.");
    }

    if (typeof iterable === "object") {
        if (Array.isArray(iterable)) {
            for (var i = 0; i < iterable.length; i++) {
                var entry = iterable[i];
                if (Array.isArray(entry)) {
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
        }
    }

    return this;
};
