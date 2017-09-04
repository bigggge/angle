/**
 * timeout.js
 *
 * @author bigggge
 * 2017/9/1.
 */
function timeout ($rootScope) {
  return function (fn, delay) {
    setTimeout(function () {
      fn();
      $rootScope.$digest();
    }, delay);
  };
}

// export default timeout

module.exports = timeout;