/**
 * ng-controller.js
 *
 * @author bigggge
 * 2017/9/1.
 */

// import Provider from '../Provider';
const Provider = require('../Provider');

// 添加controller,compile时会调用link方法，即执行获取控制器的操作
function ngController () {
  return {
    // 我们需要针对每个controller生成一个新的scope对象，所以它的scope的值是true
    scope: true,
    link: function (el, scope, exp) {
      console.log('[ng-controller link] exp', exp);
      // 获取形如function ($scope) {...}的控制器函数
      var ctrl = Provider.get(exp + Provider.CONTROLLERS_SUFFIX);
      if (!ctrl) {
        throw new Error(exp + ' not yet registered');
      }
      // invoke MainCtrl
      Provider.invoke(exp, ctrl, {$scope: scope});
    }
  };
}
// export default ngController;
module.exports = ngController;