/**
 * timeout.js
 *
 * @author bigggge
 * 2017/9/1.
 */
function timeout ($rootScope) {
  return function (fn, timeout) {
    setTimeout(function () {
      fn();
      $rootScope.$digest();
    }, timeout);
  };
}

// export default timeout

module.exports = timeout;