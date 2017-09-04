/**
 * ng-bind-html.js
 *
 * @author bigggge
 * 2017/9/4.
 */

function ngBindHtml () {
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

// export default ngBindHtml
module.exports = ngBindHtml;