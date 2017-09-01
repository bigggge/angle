/**
 * ng-bind.js
 *
 * @author bigggge
 * 2017/9/1.
 */

// 单向绑定($scope -> view)
function ngBind () {
  return {
    scope: false,
    link: function (el, scope, exp) {
      el.innerHTML = scope.$eval(exp);
      scope.$watch(exp, function (val, old) {
        el.innerHTML = val;
      });
    }
  };
}

// export default ngBind
module.exports = ngBind;