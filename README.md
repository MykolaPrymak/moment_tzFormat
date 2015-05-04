# moment_tzFormat
[moment](http://momentjs.com) formating with timezone

## Using
Set the tz offset from UTC by call
```javascript
moment.tzFormat.offset(offset);
```
Example:
```javascript
moment.tzFormat.offset(120);
```
This call sets the offset globaly.


After this you can call
```javascript
moment().tzFormat('format string')
```

## Versions
Require moment.js version 1.2.0  >= ver < 2.9.0
