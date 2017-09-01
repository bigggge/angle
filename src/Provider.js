/**
 * Provider.js
 * 用于注册组件和解决组件依赖关系
 *
 * @author bigggge
 * 2017/9/1.
 */

// import Utils from './Utils';
const Utils = require('./Utils');

const Provider = {
  // 存储所有组件的工厂函数
  _providers: {},
  // 存储组件缓存，值为函数执行后的值(controller会返回函数本身，
  // service和directive需要return一个对象而controller不需要)
  _cache: {},
  directive: function (name, fn) {
    this._register(name + Provider.DIRECTIVE_SUFFIX, fn);
  },
  controller: function (name, fn) {
    this._register(name + Provider.CONTROLLERS_SUFFIX, function () {
      return fn;
    });
  },
  service: function (name, fn) {
    this._register(name, fn);
  },
  // 注册组件
  _register: function (name, factory) {
    this._providers[name] = factory;
  },
  // 判断缓存并获取组件
  get: function (name, locals) {
    console.log('get', name, locals);
    // 如果有缓存，直接返回
    if (this._cache[name]) {
      return this._cache[name];
    }
    // 如果没有缓存，就从_providers里拿到它的工厂函数
    var provider = this._providers[name];
    if (!provider || typeof provider !== 'function') {
      return null;
    }
    // 并且调用invoke去执行工厂函数实例化它
    return (this._cache[name] = this.invoke(name, provider, locals));
  },
  // 无cache时，初始化组件及其依赖
  invoke: function (name, fn, locals) {
    locals = locals || {};
    // 形如 ["$scope", "HTTPService", "$timeout"] 的依赖列表
    const $inject = Utils.annotate(fn);
    // 获取局部依赖
    const args = $inject.map(function (moduleName) {
      return locals[moduleName] || this.get(moduleName, locals);
    }, this);
    return fn.apply(null, args);
  }
};

Provider.DIRECTIVE_SUFFIX = 'Directive';
Provider.CONTROLLERS_SUFFIX = 'Controller';

// export default Provider;
module.exports = Provider;