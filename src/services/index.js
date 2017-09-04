/**
 * index.js
 *
 * @author bigggge
 * 2017/9/1.
 */

// import rootScope from './rootScope';
// import timeout from './timeout';
const rootScope = require('./rootScope');
const timeout = require('./timeout');
const interval = require('./interval');

// export const services = {
//   rootScope,
//   timeout
// };

module.exports = {
  rootScope,
  timeout,
  interval
};