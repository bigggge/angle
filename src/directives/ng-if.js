/**
 * ng-if.js
 *
 * @author bigggge
 * 2017/9/1.
 */

// 添加if指令
function ngClick () {
  return {
    scope: false,
    link: function (el, scope, exp) {
      const original = el;
      const parent = el.parentNode;
      if (!scope.$eval(exp)) parent.removeChild(el);
      scope.$watch(exp, function (val) {
        if (val) {
          parent.appendChild(original);
        } else {
          parent.removeChild(el);
        }
      });

    }
  };
}

// export default ngClick;
module.exports = ngClick;