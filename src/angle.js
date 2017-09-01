/**
 * angle.js
 *
 * @author bigggge
 * @ref http://blog.mgechev.com/2015/03/09/build-learn-your-own-light-lightweight-angularjs/
 * 2017/9/1.
 */

// import Provider from './Provider';
// import DOMCompiler from './DOMCompiler';
// import Utils from './Utils';
// import {directives} from './directives/index';
// import {services} from './services/index';

const Provider =require('./Provider');
const DOMCompiler =require('./DOMCompiler');
const Utils =require('./Utils');
const directives =require('./directives/index');
const services =require('./services/index');

// 启动应用
function bootstrap (id) {
  for (let dir in directives) {
    if (directives.hasOwnProperty(dir)) {
      Provider.directive(Utils.convert(dir), directives[dir]);
    }
  }

  for (let service in services) {
    if (services.hasOwnProperty(service)) {
      Provider.service('$' + service, services[service]);
    }
  }
  console.log('Staring...', Provider._providers);
  DOMCompiler.compile(window.document.querySelector(id), Provider.get('$rootScope'), 0);
}

window.angle = {
  directive: Provider.directive.bind(Provider),
  controller: Provider.controller.bind(Provider),
  service: Provider.service.bind(Provider),
  bootstrap: bootstrap,
  $rootScope: Provider._cache.$rootScope,
  $cache: Provider._cache,
  $providers: Provider._providers
};

