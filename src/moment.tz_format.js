//! moment.tz_format.js
//! version : 1.0.0
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

  var VERSION = "1.0.0",

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
  var tz_transitions = [];

  function configure (offset, tzTransitions) {
    if ((offset instanceof Number) || !isNaN(parseInt(offset))) {
      tz_offset = parseInt(offset);
    }
    if ((tzTransitions instanceof Array) || (tzTransitions.length > 0)) {
      tz_transitions = [].concat(tzTransitions);

      for (var i = 0; i < tz_transitions.length; i++) {
        tz_transitions[i].time = moment(tz_transitions[i].time);
      }
    }
    return tz_offset;
  }

  function getTzOffset(mom) {
    var offset = tz_offset;
    var startTransition, endTransition;

    for (var i = 0; i < tz_transitions.length - 1; i++) {
      startTransition = tz_transitions[i];
      endTransition = tz_transitions[i + 1];

      if (mom.isAfter(startTransition.time) && mom.isBefore(endTransition.time)) {
        offset = startTransition.offset;
        break;
      }
    }

    return offset;
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

  function tz_apply (input) {
    return input;
  }

  tz_format.version      = VERSION;
  tz_format.configure    = configure;

  /************************************
    Interface with Moment.js
  ************************************/

  var fn = moment.fn;

  moment.tzFormat = tz_format;
  moment.tzApply = tz_apply;



  fn.tzFormat = function (str) {
    if (str) {
      var args = Array.prototype.slice.call(arguments);
      var mom = this;
      var offset = getTzOffset(mom);

      if (offset !== null) {
        mom = this.clone().zone(-offset);
      }

      return mom.format.apply(mom, args);
    }

    return this;
  };

  fn.tzApply = function () {
      var mom = this;
      var offset = getTzOffset(mom);

      if (offset !== null) {
        mom = this.clone().zone(-offset);
      }

      return mom;
  };

  fn.getTzOffset = function () {
      return getTzOffset(this);
  };

  // Return injected version

  return moment;
}));