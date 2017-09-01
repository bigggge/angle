/**
 * ng-click.js
 *
 * @author bigggge
 * 2017/9/1.
 */

// 添加click指令
function ngClick () {
  return {
    scope: false,
    link: function (el, scope, exp) {
      el.onclick = function () {
        scope.$eval(exp);
        scope.$digest();
      };
    }
  };
}

// export default ngClick;
module.exports = ngClick;