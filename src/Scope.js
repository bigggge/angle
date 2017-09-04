/**
 * Scope
 * 用于监控和执行表达式，执行脏检测，创建新作用域
 *
 * @author bigggge
 * 2017/9/1.
 */

// import Utils from './Utils';
const Utils = require('./Utils');

function Scope (parent, id) {
  this.$id = 'scope$id' + (id || 0);
  this.$watchers = [];
  this.$children = [];
  this.$parent = parent;
}

Scope.counter = 0;
Scope.prototype = {
  // 监控表达式 exp，一旦发现exp的值有变化就执行回调函数fn，并且传入新的值
  $watch: function (exp, fn, objectEquality) {
    this.$watchers.push({
      exp: exp,
      fn: fn,
      old: Utils.clone(this.$eval(exp)),
      eq: !!objectEquality
    });
  },
  // 原型继承当前的scope对象，生成一个新的scope对象
  $new: function () {
    Scope.counter++;
    const obj = new Scope(this, Scope.counter);
    // 设置原型链，把当前的scope对象作为新scope的原型，这样新的scope对象可以访问到父scope的属性方法
    Object.setPrototypeOf(obj, this);
    // obj.__proto__ = this;
    this.$children.push(obj);
    return obj;
  },
  // 销毁scope对象
  $destroy: function () {
    const pc = this.$parent.$children;
    pc.splice(pc.indexOf(this), 1);
  },
  // 脏检测
  $digest: function (disabledScanChild) {
    let dirty, watcher, current, i;
    // digest 最多迭代次数
    let ttl = 10;
    do {
      console.log('$digest', this);
      dirty = false;
      for (i = 0; i < this.$watchers.length; i++) {
        watcher = this.$watchers[i];
        current = this.$eval(watcher.exp);
        if (!Utils.equals(watcher.old, current, watcher.eq)) {
          watcher.fn(current, watcher.old);
          watcher.old = Utils.clone(current);
          dirty = true;
        }
      }
      if (!(ttl--)) {
        throw '10 digest iterations reached';
      }

      // console.log(--ttl)
    } while (dirty);
    // 递归调用子scope对象的脏数据检测
    if (!disabledScanChild) {
      for (i = 0; i < this.$children.length; i++) {
        this.$children[i].$digest();
      }
    }
    // 调用父scope对象的脏数据检测
    if (this.$parent) {
      this.$parent.$digest(true);
    }
  },
  // 执行函数或表达式
  $eval: function (exp) {
    let val;
    if (typeof exp === 'function') {
      val = exp.call(this);
    } else {
      try {
        with (this) {
          val = eval(exp);
        }
      } catch (e) {
        console.error(e);
        val = undefined;
      }
    }
    return val;
  }
};

function evalReplace (fn) {
  var Fn = Function;
  return new Fn('return ' + fn)();
}

// export default Scope;
module.exports = Scope;