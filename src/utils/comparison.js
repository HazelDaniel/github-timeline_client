//NOTE: THE ACCURACY/EFFICIENCY OF THE FUNCTIONS DEFINED MAY BE LIMITED TO THE SCOPE OF THE PROJECT'S USE CASE
const arrayEqual = (arr1, arr2, cmpFn) => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  if (!cmpFn) {
    return true;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (
      arr1[i] &&
      typeof arr1[i] === "object" &&
      arr2[i] &&
      typeof arr2[i] === "object" &&
      !cmpFn(arr1[i], arr2[i])
    ) {
      return false;
    } else if (
      Array.isArray(arr1[i]) &&
      Array.isArray(arr2[i]) &&
      !arrayEqual(arr1[i], arr2[i])
    ) {
      return false;
    } else if (
      !Array.isArray(arr1[i]) &&
      !Array.isArray(arr2[i]) &&
      arr1[i] &&
      typeof arr1[i] !== "object" &&
      arr2[i] &&
      typeof arr2[i] !== "object" &&
      arr1[i] !== arr2[i]
    ) {
      return false;
    }
  }

  return true;
};

export function shallowEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  for (let key of keys1) {
    if (!keys2.includes(key) || obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}

export function deepEqual(obj1, obj2) {
  if (
    (obj1 && typeof obj1 !== "object") ||
    (obj2 && typeof obj2 !== "object")
  ) {
    if (obj1 === obj2) return true;
    return false;
  }

  if (!obj1 === null && !obj2) {
    return true;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const values1 = Object.values(obj1);
  const values2 = Object.values(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }
  if (!arrayEqual(keys1, keys2, arrayEqual)) return false;
  if (!arrayEqual(values1, values2, deepEqual)) return false;

  for (let key of keys1) {
    if (!deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }
  return true;
}

export const inObjectArray = (obj, arr, fn, ...args) => {
  if (fn) {
    for (const el of arr) {
      if (fn(el, obj, ...args)) return true;
    }
    return false;
  }
  for (const el of arr) {
    if (isEqual(el, obj)) return true;
  }
  return false;
}

export const inArrayArray = (arrEntry, arr, fn, ...args) => {
  if (fn) {
    for (const el of arr) {
      if (fn(el, arrEntry, ...args)) return true;
    }
    return false;
  }

  for (const el of arr) {
    if (el.length === arrEntry.length) {
      for (const [index, item] of el.entries()) {
        if (arrEntry[index] === item) return true;
      }
    }
  }
  return false;
}

const MAX_SAFE_INTEGER = 9007199254740991;

function getMapData({ __data__ }, key) {
  const data = __data__;
  return isKeyable(key)
    ? data[typeof key === "string" ? "string" : "hash"]
    : data.map;
}

function isKeyable(value) {
  const type = typeof value;
  return type === "string" ||
    type === "number" ||
    type === "symbol" ||
    type === "boolean"
    ? value !== "__proto__"
    : value === null;
}

function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

function assocIndexOf(array, key) {
  let { length } = array;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

class ListCache {
  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  constructor(entries) {
    let index = -1;
    const length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      const entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  /**
   * Removes all key-value entries from the list cache.
   *
   * @memberOf ListCache
   */
  clear() {
    this.__data__ = [];
    this.size = 0;
  }

  /**
   * Removes `key` and its value from the list cache.
   *
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  delete(key) {
    const data = this.__data__;
    const index = assocIndexOf(data, key);

    if (index < 0) {
      return false;
    }
    const lastIndex = data.length - 1;
    if (index === lastIndex) {
      data.pop();
    } else {
      data.splice(index, 1);
    }
    --this.size;
    return true;
  }

  /**
   * Gets the list cache value for `key`.
   *
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  get(key) {
    const data = this.__data__;
    const index = assocIndexOf(data, key);
    return index < 0 ? undefined : data[index][1];
  }

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  has(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }

  /**
   * Sets the list cache `key` to `value`.
   *
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */
  set(key, value) {
    const data = this.__data__;
    const index = assocIndexOf(data, key);

    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }
}

class SetCache {
  /**
   * Creates an array cache object to store unique values.
   *
   * @private
   * @constructor
   * @param {Array} [values] The values to cache.
   */
  constructor(values) {
    let index = -1;
    const length = values == null ? 0 : values.length;

    this.__data__ = new MapCache();
    while (++index < length) {
      this.add(values[index]);
    }
  }

  /**
   * Adds `value` to the array cache.
   *
   * @memberOf SetCache
   * @alias push
   * @param {*} value The value to cache.
   * @returns {Object} Returns the cache instance.
   */
  add(value) {
    this.__data__.set(value, HASH_UNDEFINED);
    return this;
  }

  /**
   * Checks if `value` is in the array cache.
   *
   * @memberOf SetCache
   * @param {*} value The value to search for.
   * @returns {boolean} Returns `true` if `value` is found, else `false`.
   */
  has(value) {
    return this.__data__.has(value);
  }
}

SetCache.prototype.push = SetCache.prototype.add;

const HASH_UNDEFINED = "__lodash_hash_undefined__";

class Hash {
  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  constructor(entries) {
    let index = -1;
    const length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      const entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  /**
   * Removes all key-value entries from the hash.
   *
   * @memberOf Hash
   */
  clear() {
    this.__data__ = Object.create(null);
    this.size = 0;
  }

  /**
   * Removes `key` and its value from the hash.
   *
   * @memberOf Hash
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  delete(key) {
    const result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }

  /**
   * Gets the hash value for `key`.
   *
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  get(key) {
    const data = this.__data__;
    const result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }

  /**
   * Checks if a hash value for `key` exists.
   *
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  has(key) {
    const data = this.__data__;
    return data[key] !== undefined;
  }

  /**
   * Sets the hash `key` to `value`.
   *
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */
  set(key, value) {
    const data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = value === undefined ? HASH_UNDEFINED : value;
    return this;
  }
}

class MapCache {
  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  constructor(entries) {
    let index = -1;
    const length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      const entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  /**
   * Removes all key-value entries from the map.
   *
   * @memberOf MapCache
   */
  clear() {
    this.size = 0;
    this.__data__ = {
      hash: new Hash(),
      map: new Map(),
      string: new Hash(),
    };
  }

  /**
   * Removes `key` and its value from the map.
   *
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  delete(key) {
    const result = getMapData(this, key)["delete"](key);
    this.size -= result ? 1 : 0;
    return result;
  }

  /**
   * Gets the map value for `key`.
   *
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  get(key) {
    return getMapData(this, key).get(key);
  }

  /**
   * Checks if a map value for `key` exists.
   *
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  has(key) {
    return getMapData(this, key).has(key);
  }

  /**
   * Sets the map `key` to `value`.
   *
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */
  set(key, value) {
    const data = getMapData(this, key);
    const size = data.size;

    data.set(key, value);
    this.size += data.size === size ? 0 : 1;
    return this;
  }
}
const LARGE_ARRAY_SIZE = 200;

class Stack {
  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  constructor(entries) {
    const data = (this.__data__ = new ListCache(entries));
    this.size = data.size;
  }

  /**
   * Removes all key-value entries from the stack.
   *
   * @memberOf Stack
   */
  clear() {
    this.__data__ = new ListCache();
    this.size = 0;
  }

  /**
   * Removes `key` and its value from the stack.
   *
   * @memberOf Stack
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  delete(key) {
    const data = this.__data__;
    const result = data["delete"](key);

    this.size = data.size;
    return result;
  }

  /**
   * Gets the stack value for `key`.
   *
   * @memberOf Stack
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  get(key) {
    return this.__data__.get(key);
  }

  /**
   * Checks if a stack value for `key` exists.
   *
   * @memberOf Stack
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  has(key) {
    return this.__data__.has(key);
  }

  /**
   * Sets the stack `key` to `value`.
   *
   * @memberOf Stack
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the stack cache instance.
   */
  set(key, value) {
    let data = this.__data__;
    if (data instanceof ListCache) {
      const pairs = data.__data__;
      if (pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }
}

function isObjectLike(value) {
  return typeof value === "object" && value !== null;
}

export function isEqual(value, other) {
  const res = baseIsEqual(value, other);
  return res;
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

const arrayTag = "[object Array]";
const argsTag = "[object Arguments]";
const objectTag = "[object Object]";

const freeGlobal =
  typeof window === "object" &&
  window !== null &&
  window.Object === Object &&
  window;

const freeGlobalThis =
  typeof globalThis === "object" &&
  globalThis !== null &&
  globalThis.Object === Object &&
  globalThis;

/** Detect free variable `self`. */
const freeSelf =
  typeof self === "object" && self !== null && self.Object === Object && self;

/** Used as a reference to the global object. */
const root =
  freeGlobalThis || freeGlobal || freeSelf || Function("return this")();
const nativeIsBuffer = root?.Buffer?.isBuffer;

const isBuffer =
  typeof nativeIsBuffer === "function" ? nativeIsBuffer : () => false;

function getTag(value) {
  if (value == null) {
    return value === undefined ? "[object Undefined]" : "[object Null]";
  }
  return toString.call(value);
}

const reTypedTag =
  /^\[object (?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)Array\]$/;
const nodeIsTypedArray = null;
const isTypedArray = nodeIsTypedArray
  ? (value) => nodeIsTypedArray(value)
  : (value) => isObjectLike(value) && reTypedTag.test(getTag(value));

const COMPARE_PARTIAL_FLAG = 1;
const COMPARE_UNORDERED_FLAG = 2;

function some(array, predicate) {
  let index = -1;
  const length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}
function cacheHas(cache, key) {
  return cache.has(key);
}

const boolTag = "[object Boolean]";
const dateTag = "[object Date]";
const errorTag = "[object Error]";
const mapTag = "[object Map]";
const numberTag = "[object Number]";
const regexpTag = "[object RegExp]";
const setTag = "[object Set]";
const stringTag = "[object String]";
const symbolTag = "[object Symbol]";

const arrayBufferTag = "[object ArrayBuffer]";
const dataViewTag = "[object DataView]";

/** Used to convert symbols to primitives and strings. */
const symbolValueOf = Symbol.prototype.valueOf;

function mapToArray(map) {
  let index = -1;
  const result = new Array(map.size);

  map.forEach((value, key) => {
    result[++index] = [key, value];
  });
  return result;
}
function setToArray(set) {
  let index = -1;
  const result = new Array(set.size);

  set.forEach((value) => {
    result[++index] = value;
  });
  return result;
}
/* eslint-disable */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if (
        object.byteLength !== other.byteLength ||
        object.byteOffset !== other.byteOffset
      ) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;
      break;
    case arrayBufferTag:
      if (
        object.byteLength !== other.byteLength ||
        !equalFunc(new Uint8Array(object), new Uint8Array(other))
      ) {
        return false;
      }
      return true;
    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name === other.name && object.message === other.message;
    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object === `${other}`;
    case mapTag:
      let convert = mapToArray;
      break;

    case setTag:
      const isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size !== other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      const stacked = stack.get(object);
      if (stacked) {
        return stacked === other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      const result = equalArrays(
        convert(object),
        convert(other),
        bitmask,
        customizer,
        equalFunc,
        stack
      );
      stack["delete"](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) === symbolValueOf.call(other);
      }
  }
  return false;
}
/* eslint-enable */

function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  const isPartial = bitmask & COMPARE_PARTIAL_FLAG;
  const arrLength = array.length;
  const othLength = other.length;

  if (arrLength !== othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  const stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked === other;
  }
  let index = -1;
  let result = true;
  const seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    let compared;
    const arrValue = array[index];
    const othValue = other[index];

    if (customizer) {
      compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (
        !some(other, (othValue, othIndex) => {
          if (
            !cacheHas(seen, othIndex) &&
            (arrValue === othValue ||
              equalFunc(arrValue, othValue, bitmask, customizer, stack))
          ) {
            return seen.push(othIndex);
          }
        })
      ) {
        result = false;
        break;
      }
    } else if (
      !(
        arrValue === othValue ||
        equalFunc(arrValue, othValue, bitmask, customizer, stack)
      )
    ) {
      result = false;
      break;
    }
  }
  stack["delete"](array);
  stack["delete"](other);
  return result;
}

function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (
    value == null ||
    other == null ||
    (!isObjectLike(value) && !isObjectLike(other))
  ) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  let objIsArr = Array.isArray(object);
  const othIsArr = Array.isArray(other);
  let objTag = objIsArr ? arrayTag : getTag(object);
  let othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag === argsTag ? objectTag : objTag;
  othTag = othTag === argsTag ? objectTag : othTag;

  let objIsObj = objTag === objectTag;
  const othIsObj = othTag === objectTag;
  const isSameTag = objTag === othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack());
    return objIsArr || isTypedArray(object)
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(
          object,
          other,
          objTag,
          bitmask,
          customizer,
          equalFunc,
          stack
        );
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    const objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__");
    const othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");

    if (objIsWrapped || othIsWrapped) {
      const objUnwrapped = objIsWrapped ? object.value() : object;
      const othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack());
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

function getAllKeys(object) {
  const result = keys(object);
  if (!Array.isArray(object)) {
    result.push(...getSymbols(object));
  }
  return result;
}

function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  const isPartial = bitmask & COMPARE_PARTIAL_FLAG;
  const objProps = getAllKeys(object);
  const objLength = objProps.length;
  const othProps = getAllKeys(other);
  const othLength = othProps.length;

  if (objLength !== othLength && !isPartial) {
    return false;
  }
  let key;
  let index = objLength;
  while (index--) {
    key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  const stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked === other;
  }
  let result = true;
  stack.set(object, other);
  stack.set(other, object);

  let compared;
  let skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    const objValue = object[key];
    const othValue = other[key];

    if (customizer) {
      compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (
      !(compared === undefined
        ? objValue === othValue ||
          equalFunc(objValue, othValue, bitmask, customizer, stack)
        : compared)
    ) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key === "constructor");
  }
  if (result && !skipCtor) {
    const objCtor = object.constructor;
    const othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (
      objCtor !== othCtor &&
      "constructor" in object &&
      "constructor" in other &&
      !(
        typeof objCtor === "function" &&
        objCtor instanceof objCtor &&
        typeof othCtor === "function" &&
        othCtor instanceof othCtor
      )
    ) {
      result = false;
    }
  }
  stack["delete"](object);
  stack["delete"](other);
  return result;
}
const propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
const nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
function getSymbols(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return nativeGetSymbols(object).filter((symbol) =>
    propertyIsEnumerable.call(object, symbol)
  );
}
function keys(object) {
  return isArrayLike(object)
    ? arrayLikeKeys(object)
    : Object.keys(Object(object));
}
function isArrayLike(value) {
  return value != null && typeof value !== "function" && isLength(value.length);
}
function isLength(value) {
  return (
    typeof value === "number" &&
    value > -1 &&
    value % 1 === 0 &&
    value <= MAX_SAFE_INTEGER
  );
}

function arrayLikeKeys(value, inherited) {
  const isArr = Array.isArray(value);
  const isArg = !isArr && isArguments(value);
  const isBuff = !isArr && !isArg && isBuffer(value);
  const isType = !isArr && !isArg && !isBuff && isTypedArray(value);
  const skipIndexes = isArr || isArg || isBuff || isType;
  const length = value.length;
  const result = new Array(skipIndexes ? length : 0);
  let index = skipIndexes ? -1 : length;
  while (++index < length) {
    result[index] = `${index}`;
  }
  for (const key in value) {
    if (
      (inherited || hasOwnProperty.call(value, key)) &&
      !(
        skipIndexes &&
        // Safari 9 has enumerable `arguments.length` in strict mode.
        (key === "length" ||
          // Skip index properties.
          isIndex(key, length))
      )
    ) {
      result.push(key);
    }
  }
  return result;
}

const reIsUint = /^(?:0|[1-9]\d*)$/;

function isIndex(value, length) {
  const type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return (
    !!length &&
    (type === "number" || (type !== "symbol" && reIsUint.test(value))) &&
    value > -1 &&
    value % 1 === 0 &&
    value < length
  );
}

function isArguments(value) {
  return isObjectLike(value) && getTag(value) === "[object Arguments]";
}
