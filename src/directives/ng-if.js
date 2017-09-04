/**
 * ng-if.js
 *
 * @author bigggge
 * 2017/9/1.
 */

// 添加if指令
function ngIf () {
  return {
    scope: false,
    link: function (el, scope, exp) {
      const original = el;
      const parent = el.parentNode;
      const tempEl = createTempElement(el);
      insertAfter(tempEl, el);
      if (!scope.$eval(exp)) parent.removeChild(el);
      scope.$watch(exp, function (val) {
        if (val) {
          insertAfter(original, tempEl);
        } else {
          parent.removeChild(el);
        }
      });
    }
  };
}

function createTempElement (el) {
  const tempEl = document.createElement('div');
  tempEl.style.display = 'none';
  tempEl.setAttribute('ng-el', el.nodeName + '-' + el.attributes['ng-if'].nodeValue);
  return tempEl;
}

function insertAfter (newElement, targetElement) {
  const parent = targetElement.parentNode;
  if (parent.lastChild === targetElement) {
    parent.appendChild(newElement);
  } else {
    // 在当前节点的某个子节点之前再插入一个子节点
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
}

// export default ngIf;
module.exports = ngIf;