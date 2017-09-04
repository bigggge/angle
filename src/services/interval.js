/**
 * interval.js
 *
 * @author bigggge
 * 2017/9/4.
 */
function interval ($rootScope) {
  return function (fn, delay) {
    setInterval(function () {
      fn();
      $rootScope.$digest();
    }, delay);
  };
}

// export default interval

module.exports = interval;