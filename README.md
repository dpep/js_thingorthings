# ThingOrThings

Merges gets and multigets to make life simpler.


## Installation

```bash
$ npm install thingorthings
```

## Examples

```javascript
var thingorthings = require('thingorthings');

var times2 = thingorthings((things) => things.map(thing => thing * 2))

res = times2(1);
// 2

res = times2([ 1, 2, 3 ]);
// { 1: 2, 2: 4, 3: 6 }
```
