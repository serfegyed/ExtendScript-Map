# ExtendScript-Map
A lightweight Map class extension for Adobe ExtendScript

This project was originally intended for learning purposes, but it slowly turned into a full Map implementation.
As ExtendScript is a version of ES3 implemented by Adobe, it is not fully compatible with ES3.
This version can be used with Adobe programs such as Illustrator, InDesign/InCopy, or Photoshop.

This Map class is an implementation of the JavaScript built-in Map object.

## The available properties and methods are:

### Properties

* `size` -     Returns the number of key-value pairs in the map.

### Standard methods

* `clear()`    Clears the map.
* `delete()`   Deletes a key-value pair from the map.
* `entries()`  Returns a new iterator object that contains the key/value pairs in the map.
* `forEach()`  Iterates through each element of the map and applies a callback function.
* `get()`      Retrieves a value from the map's data using the provided key.
* `has()`      Checks if the given key exists in the map's data.
* `keys()`     Returns a new iterator object that contains the keys in the map.
* `set()`      Sets the value of a key in the map.
* `values()`   Returns a new iterator object that contains the values in the map.

### Non-standard methods
*(They are mostly Array-like methods in some stage of tc39 proposal phase)*

* `every()`    Iterates over all key-value pairs in the map and applies the given function to each pair.
* `filter()`   Filters the elements of a Map object based on a provided callback function.
* `find()`     Finds the first element in the map that satisfies the provided testing function.
* `findKey()`  Find the key that satisfies the given condition in the map.
* `from()`     Creates a new Map by applying a mapping function to the elements of an iterable object.
* `includes()` Checks if the map instance includes a specific element.
* `isEmpty()`  Determines whether the given parameter is an empty Map.
* `isMap()`    Checks if an object is a Map.
* `keyOf()`    Returns the first key associated with the specified search element in the map.
* `mapKeys()`  Maps the keys of the map using a callback function.
* `mapValues()`Maps each value of the Map object using a callback function.
* `reduce()`   Reduce the Map to a single value by applying a callback function to each key-value pair.
* `some()`     Executes the provided callback function once for each key-value pair in the Map object.
* `toArray()`  Returns an array representation of the map.
* `toString()` Returns a string representation of the map.
 
## Externals   

* `sameValueZero()` - Determines if two values are equal using the SameValueZero algorithm.

