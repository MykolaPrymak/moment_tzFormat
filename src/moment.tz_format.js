//! moment.tz_format.js
//! version : 0.0.1
//! authors : Mykola Prymak
//! license : MIT
//! https://github.com/MykolaPrymak/moment_tzFormat


(function (root, factory) {
  "use strict";

  /*global define*/
  if (typeof define === 'function' && define.amd) {
    define(['moment'], factory);                 // AMD
  } else if (typeof exports === 'object') {
    module.exports = factory(require('moment')); // Node
  } else {
    factory(root.moment);                        // Browser
  }
}(this, function (moment) {
  "use strict";

  // Do not load moment-timezone a second time.
  if (moment.tz_format !== undefined) { return moment; }

  var VERSION = "0.0.1",

    momentVersion = moment.version.split('.'),
    major = +momentVersion[0],
    minor = +momentVersion[1];

  // Moment.js version check
  if ((major < 1) || (major === 1 && minor < 2) || (major > 2) || (major === 2 && minor > 8)) {
    logError('Moment Timezone Format requires 1.2.0 >= Moment.js < 2.9.0. You are using Moment.js ' + moment.version + '. See momentjs.com');
  }


  /************************************
    Global Methods
  ************************************/

  var tz_offset = null;

  function getSetOffset (offset) {
    if ((offset instanceof Number) || !isNaN(parseInt(offset))) {
      tz_offset = parseInt(offset);
    }
    return tz_offset;
  }

  function logError (message) {
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error(message);
    }
  }

  /************************************
    moment.tz namespace
  ************************************/

  function tz_format (input) {
    return input;
  }

  tz_format.version      = VERSION;
  tz_format.offset       = getSetOffset;

  /************************************
    Interface with Moment.js
  ************************************/

  var fn = moment.fn;

  moment.tzFormat = tz_format;


  fn.tzFormat = function (str) {
    if (str) {
      var args = Array.prototype.slice.call(arguments);
      var mom = this;

      if (tz_offset !== null) {
        mom = this.clone().zone(tz_offset);
      }

      return mom.format.apply(mom, args);
    }

    return this;
  };

  // Return injected version

  return moment;
}));