/**
 * Utils.js
 *
 * @author bigggge
 * 2017/9/1.
 */

const Utils = {
  equals: function (a, b) {
    'use strict';
    return JSON.stringify(a) === JSON.stringify(b);
  },
  clone: function (a) {
    'use strict';
    try {
      return JSON.parse(JSON.stringify(a));
    } catch (e) {
      return undefined;
    }
  },
  annotate: function (fn) {
    const res = fn.toString()
    // 去掉注释
      .replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '')
      .match(/\((.*?)\)/);
    if (res && res[1]) {
      return res[1].split(',').map(function (d) {
        return d.trim();
      });
    }
    return [];
  },
  convert(s){
    return s.replace(/([A-Z])/g, '-$1').toLowerCase();
  }
};

// export default Utils
module.exports = Utils;