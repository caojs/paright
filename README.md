## Install:
```
npm install --save paright
```

## Example:

```javascript
var paright = require('paright');

/**
Example function
@param {number} first
@param {object} [second]
*/
function foo(first, second) {
  paright(arguments)
    .hasPattern('number')
    .hasPattern('number', 'object|array')
    .test();
  return true;
}

foo(1);
foo(1, {});
foo(1, []);
// -> true

foo({});
// Throws Error;
```

## Usage:
Call `paright` function with an array-like parameter which you want to validate.
```javascript
var params = paright(arrayLike);
```
This returns an object, call `hasPattern` method on this object to add pattern and call `test` method to start validation. It will throw a Runtime Error if `arrayLike` doesn't match with any patterns.
```javascript
params
  .hasPattern('string')
  .hasPattern('string', 'number')
  .hasPattern('boolean|number')
  .test();
```

## Types:
```
string
number
boolean
object
array
null
nan
```
