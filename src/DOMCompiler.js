/**
 * DOMCompiler.js *
 * 用于遍历DOM树，获取元素的directive指令，管理作用域和调用指令的link方法
 *
 * @author bigggge
 * 2017/9/1.
 */
// import Provider from './Provider';
const Provider = require('./Provider');

const DOMCompiler = {
  compile: function (el, scope, level) {
    // console.log('compile', el, scope.$id, ' level=' + level);
    // 得到形如 [{name: "ng-controller", value: "MainCtrl"},...] 的数组
    const dirs = this._getElDirectives(el);
    let directive;
    // 遍历
    dirs.forEach(function (dir) {
      directive = Provider.get(dir.name + Provider.DIRECTIVE_SUFFIX);
      // 在需要的时候创建作用域
      if (directive.scope) {
        console.warn('New Scope: ', dir.name);
        scope = scope.$new();
      }
      // 调用link方法参数(el, scope, exp)
      directive.link(el, scope, dir.value);
    });
    // 递归编译子元素
    Array.prototype.slice.call(el.children).forEach(function (child) {
      this.compile(child, scope, level + 1);
    }, this);
  },
  // 获取元素的directive列表
  _getElDirectives: function (el) {
    const attrs = el.attributes;
    let result = [];
    for (let i = 0; i < attrs.length; i++) {
      if (Provider.get(attrs[i].name + Provider.DIRECTIVE_SUFFIX)) {
        result.push({
          name: attrs[i].name,
          value: attrs[i].value
        });
      }
    }
    return result;
  }
};

// export default DOMCompiler;
module.exports = DOMCompiler;