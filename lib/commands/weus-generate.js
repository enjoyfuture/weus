'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _actions = require('../generate/actions');

var _actions2 = _interopRequireDefault(_actions);

var _ejsHelpers = require('../util/ejsHelpers');

var _ejsHelpers2 = _interopRequireDefault(_ejsHelpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.description('Generate components, routes, redux, models using mern generator').arguments('<generator> [args]').parse(process.argv);

console.log(_chalk2.default.yellow('-------------'));

var args = _commander2.default.args;

//TODO 这里需要判断是否传入参数，待写,
var moduleName = args[0];
var actionsInst = _actions2.default.create();
//设置模板根目录
actionsInst.setContext('module');

var modulePath = ['client', 'modules', moduleName];

// Module Page
var fileName = [].concat(modulePath, [_ejsHelpers2.default.capitalize(moduleName) + 'Page.js']);
actionsInst.copyTpl('module.ejs', fileName, {
  name: moduleName,
  helpers: _ejsHelpers2.default
});

// Component
fileName = [].concat(modulePath, ['components', _ejsHelpers2.default.capitalize(moduleName) + '.js']);
actionsInst.copyTpl('module-component.ejs', fileName, {
  name: moduleName,
  helpers: _ejsHelpers2.default
});

//Constant
fileName = [].concat(modulePath, ['constant.js']);
actionsInst.copyTpl('module-constant.ejs', fileName, {});

//Action
fileName = [].concat(modulePath, ['action.js']);
actionsInst.copyTpl('module-action.ejs', fileName, {});

//Reducer
fileName = [].concat(modulePath, ['reducer.js']);
actionsInst.copyTpl('module-reducer.ejs', fileName, {
  name: moduleName
});

//scss
fileName = [].concat(modulePath, [moduleName + '.scss']);
actionsInst.copyTpl('module-scss.ejs', fileName, {
  name: moduleName,
  helpers: _ejsHelpers2.default
});

// Unit Test
actionsInst.setContext('module/__tests__');

fileName = [].concat(modulePath, ['__tests__', _ejsHelpers2.default.capitalize(moduleName) + 'Action.spec.js']);
actionsInst.copy('Action.spec.ejs', fileName);

fileName = [].concat(modulePath, ['__tests__', _ejsHelpers2.default.capitalize(moduleName) + 'Reducer.spec.js']);
actionsInst.copyTpl('Reducer.spec.ejs', fileName, {
  name: moduleName
});

fileName = [].concat(modulePath, ['__tests__', 'components', _ejsHelpers2.default.capitalize(moduleName) + '.spec.js']);
actionsInst.copyTpl(['components', 'Component.spec.ejs'], fileName, {
  name: moduleName,
  helpers: _ejsHelpers2.default
});

console.log(_chalk2.default.yellow('Create module [' + moduleName + '] success'));

console.log(_chalk2.default.yellow('-------------'));