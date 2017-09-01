/**
 * ng-show.js
 *
 * @author bigggge
 * 2017/9/1.
 */

// 添加show指令
function ngShow () {
  return {
    scope: false,
    link: function (el, scope, exp) {
      var original = el.style.display;
      el.style.display = scope.$eval(exp) ? original : 'none';
      scope.$watch(exp, function (val) {
        el.style.display = val ? original : 'none';
      });
    }
  };
}

// export default ngShow;
module.exports = ngShow;