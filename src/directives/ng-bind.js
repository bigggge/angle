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
      el.innerText = scope.$eval(exp);
      scope.$watch(exp, function (val, old) {
        el.innerText = val;
      });
    }
  };
}

// export default ngBind
module.exports = ngBind;