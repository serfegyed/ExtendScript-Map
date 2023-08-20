#include "..\\Lib\\Map.js";
/*******************************************************************/

// Create a new Map object
var myArr = [
    [1, "one"],
    [2, "two"],
    [3, "three"],
];

var myMap1 = new Map(myArr);
$.writeln("Create a new Map from array");
$.writeln(myArr);
$.writeln("myMap1: " + myMap1);

var myMap2 = new Map(myMap1);
$.writeln("\nCreate a new Map from previous Map");
$.writeln("myMap1: " + myMap1);
$.writeln("myMap2: " + myMap2);

var myObj3 = { key: "Key", value: "Value", name: "Name" };
var myMap3 = new Map(myObj3);
$.writeln("\nCreate a new Map from object");
$.writeln(myObj3);
$.writeln("myMap3: " + myMap3);

var myMap = new Map();
$.writeln("\nTest the 'set' method");
$.writeln(myMap.set('key1', 'value1').set('key2', 'value2').set('key3', null));
$.writeln(myMap.size); // Output: 3
$.writeln(myMap.set('key1', 'value4').set('key4', Infinity).set('key5', NaN).set('key6', null).set('key7', undefined));
$.writeln(myMap.size); // Output: 7

$.writeln("\nTest the 'includes' method");
$.writeln(myMap.includes('value4')); // true
$.writeln(myMap.includes('value6')); // false
$.writeln(myMap.includes(undefined)); // true
$.writeln(myMap.includes(null)); // true
$.writeln(myMap.includes(Infinity)); // true
$.writeln(myMap.includes(NaN)); //true
try {
    $.writeln(myMap.includes()); // TypeError
} catch (e) { $.writeln('TypeError: missing parameter.') }

$.writeln("\nTest the 'find' method");
$.writeln(myMap.find(function (x) { return x !== null })); // value4

$.writeln("\nTest the 'findKey' method");
$.writeln(myMap.findKey(function (x) { return x === Infinity })); // key4

$.writeln("\nTest the 'keyOf' method");	// key5
$.writeln(myMap.keyOf(NaN));

$.writeln("\nTest the 'delete' method");
$.writeln(myMap.delete('key1')); // true
$.writeln(myMap.delete('key1')); // false
$.writeln(myMap.toString())
$.writeln(myMap.size); // Output: 2

$.writeln("\nTest the 'clear' method");
$.writeln(myMap.clear()); // Output: undefined
$.writeln(myMap.size); // Output: 0

// Adding to map again
myMap.set('key1', 'value1').set('key2', 'value2').set('key3', 'value3');
$.writeln("\nTest the 'get' method");
$.writeln(myMap.get('key1')); // Output: value1
$.writeln(myMap.get('noKey1')); // Output: undefined

$.writeln("\nTest the iterator methods");
var keysIterator = myMap.keys();
var valuesIterator = myMap.values();
var entriesIterator = myMap.entries();

$.writeln("\nTest the 'keys' iterator method");
$.writeln("Map.prototype.keys() iterator");
var result = null;
while (!(result = keysIterator.next()).done) {
    $.writeln(result.value);
};
/*
key1
key2
key3
*/

$.writeln("\nTest the 'values' iterator method");
$.writeln("Map.prototype.values() iterator");
var result = null;
while (!(result = valuesIterator.next()).done) {
    $.writeln(result.value);
};
/*
value1
value2
value3	
*/

$.writeln();

$.writeln("\nTest the 'entries' iterator method");
$.writeln("Map.prototype.entries() iterator"); // Output: key1: value1, key2: value2, key3: value3
var result = null;
while (!(result = entriesIterator.next()).done) {
    $.writeln(result.value);
};
/*
["key1", "value1"]
["key2", "value2"]
["key3", "value3"]	
*/

$.writeln("\nTest the 'toArray' method");
$.writeln("toArray method");
$.writeln(myMap.toArray()); // Output: [["key1", "value1"], ["key2", "value2"], ["key3", "value3"]]
$.writeln("toArray method with 'keys' parameter");
$.writeln(myMap.toArray('keys')); // Output: ["key1", "key2", "key3"]
$.writeln("toArray method with 'values' parameter");
$.writeln(myMap.toArray('values')); // Output: ["value1", "value2", "value3"]

$.writeln("\nTest the 'toString' method");
$.writeln("toString method");
$.writeln(myMap.toString()); // Output: {{key1=>"value1"}, {key2=>"value2"}, {key3=>"value3"}}

$.writeln("\nTest the 'forEach' method");
$.writeln("forEach method");
myMap.forEach(function (value, key) {
    $.writeln(key + ' ==> ' + value);
});
/* Output:
key1 ==> value1
key2 ==> value2
key3 ==> value3
*/

// Tests for Map.prototype.some
$.writeln("\nTests for Map.prototype.some")
// Test case 1: Callback returns true for at least one value
var map1 = new Map();
map1.set(1, "apple");
map1.set(2, "banana");
map1.set(3, "cherry");

var result1 = map1.some(function (value) {
    return value.length > 5;
});

$.writeln(result1); // Output: true

// Test case 2: Callback returns false for all values
var map2 = new Map();
map2.set(1, "apple");
map2.set(2, "banana");
map2.set(3, "cherry");

var result2 = map2.some(function (value) {
    return value[0] === ("X");
});
$.writeln(result2); // Output: false

// Test case 3: Callback throws an error
var map3 = new Map();
map3.set(1, "apple");
map3.set(2, "banana");
map3.set(3, "cherry");

try {
    map3.some("not a function");
} catch (error) {
    $.writeln(error.message); // Output: Missing callback function
}


// Tests for Map.prototype.every
$.writeln("\nTests for Map.prototype.every")
// Test case 1: Callback returns true for all entries
var map1 = new Map();
map1.set('key1', 'value1');
map1.set('key2', 'value2');

var result1 = map1.every(function (value, key) {
    return value.length > 0;
});

$.writeln(result1); // Expected output: true

// Test case 2: Callback returns false for at least one entry
var map2 = new Map();
map2.set('key1', 'value1');
map2.set('key2', '');

var result2 = map2.every(function (value, key) {
    return value.length > 0;
});

$.writeln(result2); // Expected output: false

// Test case 3: Callback throws an error
var map3 = new Map();
map3.set('key1', 'value1');
map3.set('key2', 'value2');

try {
    var result3 = map3.every(null);
} catch (error) {
    $.writeln(error.message); // Expected output: "Missing callback function"
}

// Test cases for keyOf
$.writeln("\nTests for Map.prototype.keyOf")
var map = new Map();
map.set(1, 'one');
map.set(2, 'two');
map.set(3, 'three');
map.set(4, null);
map.set(5, NaN);
map.set(6, Infinity);
map.set(7, 'one');

$.writeln(map.keyOf('one')); // Output: 1
$.writeln(map.keyOf('two')); // Output: 2
$.writeln(map.keyOf('four')); // Output: undefined

// Edge cases
$.writeln(map.keyOf(undefined)); // Output: undefined
$.writeln(map.keyOf(null)); // Output: 4
$.writeln(map.keyOf(NaN)); // Output: 5
$.writeln(map.keyOf(Infinity)); // Output: 6
$.writeln(map.keyOf(0)); // Output: undefined
$.writeln(map.keyOf(1)); // Output: undefined (value is 'one', not 1)


// Tests for Map.prototype.filter
$.writeln("\nTests for Map.prototype.filter")

var map = new Map();
map.set('a', 1);
map.set('b', 2);
map.set('c', 3);

var filteredMap = map.filter(function (value, key) {
    return value > 1;
});

$.writeln("\n" + filteredMap.toString()); // {{b=>2}, {c=>3}}
$.writeln(filteredMap.size); // 2
$.writeln(filteredMap.get('a')); // undefined
$.writeln(filteredMap.get('b')); // 2
$.writeln(filteredMap.get('c')); // 3

filteredMap = map.filter(function (value, key) {
    return key === 'a';
});

$.writeln("\n" + filteredMap.toString()); // {{a=>1}}
$.writeln(filteredMap.size); // 1
$.writeln(filteredMap.get('a')); // 1
$.writeln(filteredMap.get('b')); // undefined
$.writeln(filteredMap.get('c')); // undefined

filteredMap = map.filter(function (value, key) {
    return ['a', 'c'].indexOf(key) !== -1;
});

$.writeln("\n" + filteredMap.toString()); // {{a=>1}, {c=>3}}
$.writeln(filteredMap.size); // 2
$.writeln(filteredMap.get('a')); // 1
$.writeln(filteredMap.get('b')); // undefined
$.writeln(filteredMap.get('c')); // 3


// Tests for Map.prototype.mapValues
$.writeln("\nTests for Map.prototype.mapValues")
// Create a new Map
var map = new Map();
map.set('key1', 1);
map.set('key2', 2);
map.set('key3', 3);

// Test case 1: Multiply each value by 2
var multipliedMap = map.mapValues(function (value) {
    return value * 2;
});
$.writeln(multipliedMap.get('key1')); // Output: 2
$.writeln(multipliedMap.get('key2')); // Output: 4
$.writeln(multipliedMap.get('key3')); // Output: 6

// Test case 2: Append ' - processed' to each value
var processedMap = map.mapValues(function (value) {
    return value + ' - processed';
});
$.writeln(processedMap.get('key1')); // Output: '1 - processed'
$.writeln(processedMap.get('key2')); // Output: '2 - processed'
$.writeln(processedMap.get('key3')); // Output: '3 - processed'

// Test case 3: Use a custom `this` value
var thisArg = {
    multiplier: 10
};
var customMap = map.mapValues(function (value) {
    return value * this.multiplier;
}, thisArg);
$.writeln(customMap.get('key1')); // Output: 10
$.writeln(customMap.get('key2')); // Output: 20
$.writeln(customMap.get('key3')); // Output: 30


// Tests for Map.prototype.mapKeys
$.writeln("\nTests for Map.prototype.mapKeys")
var map = new Map();
map.set("a", 1).set("b", 2).set("c", 3);

// Test 1: map keys to their uppercase equivalent
var newMap = map.mapKeys(function (key) {
    return key.toUpperCase();
});
$.writeln(newMap); // {{A=>1}, {B=>2}, {C=>3}}

// Test 2: map keys to their ASCII code
newMap = map.mapKeys(function (key) {
    return key.charCodeAt(0);
});
$.writeln(newMap); // {{97=>1}, {98=>2}, {99=>3}}

// Test 3: map keys to their length (all keys have length 1)
newMap = map.mapKeys(function (key) {
    return key.length;
});
$.writeln(newMap); // {{1=>3}}

// Edge case 1: callback function returns non-unique keys
var newMap = map.mapKeys(function (key) {
    return "x";
});
$.writeln(newMap); // {{x=>3}}

// Edge case 2: callback function returns non-string, non-numeric keys
newMap = map.mapKeys(function (key) {
    return { key: key };
});
$.writeln(newMap); // {{{key: "a"}=>1}, {{key: "b"}=>2}, {{key: "c"}=>3}}

// Edge case 3: Map is empty
map = new Map();
newMap = map.mapKeys(function (key) {
    return key;
});
$.writeln(newMap.size); // 0


// Tests for Map.prototype.reduce
$.writeln("\nTests for Map.prototype.reduce")
// Test case 1: Reduce Map values to a sum
var map1 = new Map();
map1.set('a', 1).set('b', 2).set('c', 3);
var sum = map1.reduce(function (accumulator, value) {
    return accumulator + value;
}, 0);
$.writeln("Test 1: " + sum); // Output: 6

// Test case 2: Reduce Map values to a string concatenation
var map2 = new Map();
map2.set('a', 'Hello').set('b', 'World').set('c', '!');
var str = map2.reduce(function (accumulator, value) {
    return accumulator + value;
}, '');
$.writeln("Test 2: " + str); // Output: 'HelloWorld!'

// Test case 3: Reduce an empty Map without initial value
var map3 = new Map();
try {
    map3.reduce(function (accumulator, value) {
        return accumulator + value;
    });
} catch (error) {
    $.writeln("Test 3: " + error); // Output: TypeError: Empty Map without an initial value
}

// Test case 4: Reduce with different initial value
var map4 = new Map();
map4.set('a', 1).set('b', 2).set('c', 3);
var product = map4.reduce(function (accumulator, value) {
    return accumulator * value;
}, 1);
$.writeln("Test 4: " + product); // Output: 6

// Test case 5: Reduce Map with only one entry var 
map5 = new Map()
map5.set('a', 1);
var sumSingleEntry = map5.reduce(function (accumulator, value) { return accumulator + value; });
$.writeln("Test 5: " + sumSingleEntry); // Output: 1

// Test case 6: Reduce Map without providing an initial value 
var map6 = new Map();
map6.set('a', 1).set('b', 2).set('c', 3);
try {
    $.writeln("Test 6: " + map6.reduce(function (accumulator, value) { return accumulator + value; }));
}
catch (error) {
    $.writeln("Test 6: " + error); // Output: 6
}

// Test case 7: Reduce Map with undefined as initial value 
var map7 = new Map();
map7.set('a', 1).set('b', 2).set('c', 3);
var sumWithUndefinedInitialValue = map7.reduce(function (accumulator, value) { return accumulator + value; }, undefined);
$.writeln("Test 7: " + sumWithUndefinedInitialValue); // Output: 6

// Test case 8: Reduce Map with null as initial value 
var map8 = new Map();
map8.set('a', 1).set('b', 2).set('c', 3);
var sumWithNullInitialValue = map8.reduce(function (accumulator, value) { return accumulator + value; }, null);
$.writeln("Test 8: " + sumWithNullInitialValue); // Output: 6

// Test case 9: Reduce Map with non-function callback 
var map9 = new Map();
map9.set('a', 1).set('b', 2).set('c', 3);
try {
    map9.reduce("invalid callback", 0);
}
catch (error) {
    $.writeln("Test 9: " + error); // Output: TypeError: Callback must be a function 
}

// Test case 10: Reduce Map with callback that returns undefined 
var map10 = new Map();
map10.set('a', 1).set('b', 2).set('c', 3);
try {
    map10.reduce(function (accumulator, value) { // Do something but return undefined 
    }, 0);
} catch (error) {
    $.writeln("Test 10: " + error); // Output: TypeError: Reducer function returns an invalid value 
}

// Map.from()
$.writeln("\nTests Map.prototype.from() method")

// Test case 1: Array
var myMap = new Map();
var arr = [['key1', 'value1'], ['key2', 'value2']];
$.writeln("\nTest 1: " + myMap.from(arr));	// Test 1: {{key1=>"value1"}, {key2=>"value2"}}
$.writeln(myMap.get('key1') === 'value1'); // Expected output: true
$.writeln(myMap.get('key2') === 'value2'); // Expected output: true

// Test case 2: Another Map instance
var myMap = new Map();
var anotherMap = new Map();
anotherMap.set('key3', 'value3');
anotherMap.set('key4', 'value4');
$.writeln("\nTest 2: " + myMap.from(anotherMap));	// Test 2: {{key3=>"value3"}, {key4=>"value4"}}
$.writeln(myMap.get('key3') === 'value3'); // Expected output: true
$.writeln(myMap.get('key4') === 'value4'); // Expected output: true

// Test case 3: Object with key/value pairs
var myMap = new Map();
var arrayLike = {
    length: 3,
    0: 2,
    1: 3,
    2: 4,
    3: 5
};
$.writeln("\nTest 3: " + myMap.from(arrayLike));	// Test 3: {{length=>3}, {0=>2}, {1=>3}, {2=>4}, {3=>5}}
$.writeln(myMap.get('length') === 3); // Expected output: true
$.writeln(myMap.get(1) === 3); // Expected output: true

// Test case 4: Empty iterable
var myMap = new Map();
var emptyArr = [];
$.writeln("\nTest 4: " + myMap.from(emptyArr));	// Test 4: {}
$.writeln(myMap.size); // Expected output: 0

// Test case 5: Iterable with invalid entries
var myMap = new Map();
var invalidArr = [[1, 2], [3], [4, 5, 6]];
$.writeln("\nTest 5: " + myMap.from(invalidArr));	//Test 5: {{1=>2}, {3=>undefined}, {4=>5}}

// Test case 6: Iterable with null entry
var myMap = new Map();
var nullArr = [[null, 'value']];
$.writeln("\nTest 6: " + myMap.from(nullArr));	// Test 6: {{null=>"value"}}
$.writeln(myMap.get(null) === 'value'); // Expected output: true

// Test case 7: Iterable with undefined entry
var myMap = new Map();
var undefinedArr = [[undefined, 'value']];
$.writeln("\nTest 7: " + myMap.from(undefinedArr));	// Test 7: {{undefined=>"value"}}
$.writeln(myMap.get(undefined) === 'value'); // Expected output: true

// Test case 8: Iterable with duplicate keys
var myMap = new Map();
var duplicateArr = [['key1', 'value1'], ['key1', 'value2']];
$.writeln("\nTest 8: " + myMap.from(duplicateArr));	// Test 8: {{key1=>"value2"}}
$.writeln(myMap.get('key1') === 'value2'); // Expected output: true

// Test case 9: Iterable with non-string keys
var myMap = new Map();
var nonStringKeysArr = [[123, 'value']];
$.writeln("\nTest 9: " + myMap.from(nonStringKeysArr));	// Test 8: {{key1=>"value2"}}
$.writeln(myMap.get(123) === 'value'); // Expected output: true