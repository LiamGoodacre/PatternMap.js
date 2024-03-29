/*!
 * PatternMap.js JavaScript Utility v1.1.0
 * http://github.com/LiamGoodacre/PatternMap.js
 * 
 * Copyright 2011, Liam Goodacre
 * 
 * Author : Liam Goodacre
 * Author URL : http://liamgoodacre.com
 * GitHub : https://github.com/LiamGoodacre/PatternMap.js
 * Date : 2012_03_28
*/
/*jslint indent: 2, browser: true, nomen: true, unparam: true*/
/*global console*/
if (!window.PatternMap) {
  (function () {
    "use strict";
    var fns = {
      //  Identifies the type of some data
      type: function (_obj) { return Object.prototype.toString.call(_obj).slice(8, -1); },

      //  Looks up data in a map
      lookup: function (_map, _data) {
        var type, match;
        type = fns.type(_data);
        match = fns.match(_map, type, _data);
        if (match) {
          console.log("Match!:", match);
          return match;
        }
        console.log("No match found.");
      },

      //  Matches a type and value in a map if possible
      match: function (_map, _type, _value) {
        var keys, keysplit, key, index, max;
        keys = Object.keys(_map);

        for (index = 0, max = keys.length; index < max; index += 1) {
          key = keys[index];
          keysplit = keys[index].split(':');

          //  Do the types match?
          if (fns.compare.String(keysplit[0], _type)) {
            if (keysplit[1] && keysplit[1].slice(0, 2) === "->") {
              //  Explicit function used, so try it out
              if (_map[key][0](_value)) {
                return _map[key][1];
              }
            } else {
              //  No value match specified, so just use type
              if (keysplit.length === 1) {
                return _map[key];
              }

              //  Value match specified, so try it out
              if (fns.compare[_type](keysplit.slice(1).join(':'), _value)) {
                return _map[key];
              }
            }
          }
        }
      },
      compare: {
        "String" : function (_rule, _value) { return !!(new RegExp(_rule).exec(_value)); },
        "Number" : function (_rule, _value) { return (_rule === _value); },
        "Array" : function (_rule, _value) { return (_rule === _value.length); }
      }
    };

    //  Release api
    window.PatternMap = function (_map) {
      return function (_data) { return fns.lookup(_map, _data); };
    };
  }());
}