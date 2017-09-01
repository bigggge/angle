/**
 * rootScope.js
 * $rootScope 为全局唯一的scope
 *
 * @author bigggge
 * 2017/9/1.
 */
// import Scope from '../Scope';
const Scope = require('../Scope');

function rootScope () {
  return new Scope();
}

// export default rootScope;

module.exports = rootScope;