/**
 * index.js
 *
 * @author bigggge
 * 2017/9/1.
 */

// import ngController from './ng-controller';
// import ngBind from './ng-bind';
// import ngModel from './ng-model';
// import ngClick from './ng-click';
// import ngIf from './ng-if';
// import ngShow from './ng-show';
const ngController = require('./ng-controller');
const ngBind = require('./ng-bind');
const ngBindHtml = require('./ng-bind-html');
const ngModel = require('./ng-model');
const ngClick = require('./ng-click');
const ngIf = require('./ng-if');
const ngShow = require('./ng-show');

// export const directives = {
//   ngController,
//   ngBind,
//   ngBindHtml,
//   ngModel,
//   ngClick,
//   ngIf,
//   ngShow
// };

module.exports = {
  ngController,
  ngBind,
  ngBindHtml,
  ngModel,
  ngClick,
  ngIf,
  ngShow
};