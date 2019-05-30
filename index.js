module.exports = function ThingOrThings(fn) {
  if (typeof fn !== "function") {
    throw TypeError("expected function, got: " + (typeof fn))
  }

  // return wrapper function
  return (thing_or_things, ...args) => {
    const is_array = Array.isArray(thing_or_things)
    const things = is_array ? thing_or_things : [ thing_or_things ]

    let res = fn(things, ...args)
    if (res === undefined) {
      return
    }

    if (Array.isArray(res)) {
      if (things.length !== res.length) {
        throw Error(
          `expected ${things.length} things returned, found ${res.length}`
        )
      }

      // zip things and res into hash
      res = things.reduce((obj, key, i) => {
        obj[key] = res[i]
        return obj
      }, {})
    }

    // ensure all things are mapped
    things.forEach(x => {
      if (! res.hasOwnProperty(x)) {
        throw Error("no key for: " + x)
      }
    })

    // unpackage if originally a scalar
    if (! is_array) {
      res = res[thing_or_things]
    }

    return res
  }
}
