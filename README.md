# moment_tzFormat
[moment](http://momentjs.com) formating with timezone

## Using
Set the tz offset from UTC by call
```javascript
moment.tzFormat.offset(offset);
```
Example:
```javascript
// For GTM-3
moment.tzFormat.offset(180);
// For GTM+5 (EES)
moment.tzFormat.offset(-300);
```
This call sets the offset globaly.


After this you can call
```javascript
moment().tzFormat('format string')
```

## Versions
Require moment.js version 1.2.0  >= ver < 2.9.0
