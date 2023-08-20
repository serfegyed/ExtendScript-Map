/**
 * Checks if a value is a string.
 *
 * @param {any} value - The value to be checked.
 * @return {boolean} Returns true if the value is a string, otherwise false.
 */
if (typeof isString === "undefined") {
    function isString(value) {
        return typeof value === "string";
    };
};

/**
 * Determines if two values are equal using the SameValueZero algorithm.
 *
 * @param {any} x - The first value to compare.
 * @param {any} y - The second value to compare.
 * @return {boolean} Returns true if the values are equal, false otherwise.
 */
if (typeof sameValueZero === "undefined") {
    function sameValueZero(x, y) {
        if (typeof x === "number" && typeof y === "number") {
            // x and y are equal (may be -0 and 0) or they are both NaN
            return x === y || (x !== x && y !== y);
        }
        return x === y;
    };
};

/**
 * Checks if the given argument is an array.
 *
 * @param {any} arg - The argument to be checked.
 * @return {boolean} Returns true if the argument is an array, false otherwise.
 */
if (!Array.isArray) {
    Array.isArray = function (arg) {
        return arg === undefined || arg === null ? false : arg.__class__ === "Array";
    };
};

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (elem /*, from*/) {
        var from = Math.floor(arguments[1]) || 0;
        if (Math.abs(from) > this.length) return -1;
        from = from < 0 ? (from += this.length) : from;
        for (var i = from; i < this.length; i++) {
            if (this[i] === elem) return i;
        }
        return -1;
    };
};