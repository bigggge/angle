/**
 * ng-model.js
 *
 * @author bigggge
 * 2017/9/1.
 */

// 双向绑定($scope -> view and view -> $scope)(仅支持input标签)
function ngModel () {
  return {
    link: function (el, scope, exp) {
      el.onkeyup = function () {
        scope[exp] = el.value;
        scope.$digest();
      };
      scope.$watch(exp, function (val, old) {
        el.value = val;
      });
    }
  };
}

// export default ngModel;
module.exports = ngModel;