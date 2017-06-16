'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version(_package2.default.version).description('Initialize a WEUS powered project').command('init [name]', 'Initialize a WEUS project.').command('list', 'List WEUS assets').command('search [name]', 'Search for WEUS assets').command('info [name]', 'View details of a WEUS asset').parse(process.argv);

if (!_commander2.default.args.length) {
  _commander2.default.help();
}