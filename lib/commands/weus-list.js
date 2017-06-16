'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _cliTable = require('cli-table');

var _cliTable2 = _interopRequireDefault(_cliTable);

var _assets = require('../../assets.json');

var _assets2 = _interopRequireDefault(_assets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

_commander2.default.parse(process.argv);

var assetsTable = new _cliTable2.default({
    head: ['Name', 'Description', 'Author']
});

// Make a variants table to show to all the variants
assetsTable.push.apply(assetsTable, _toConsumableArray(_assets2.default.map(function (v) {
    return Object.keys(v).map(function (k) {
        return v[k];
    }).slice(0, 3);
})));

console.log(_chalk2.default.yellow('WEUS assets'));
console.log(_chalk2.default.yellow('-------------'));
console.log(assetsTable.toString());
console.log(_chalk2.default.yellow('For more info, execute "weus info <asset_name>"'));

process.exit(0);