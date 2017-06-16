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

if (!_commander2.default.args.length) {
    _commander2.default.help();
}

if (_commander2.default.args.length < 1) {
    console.log(_chalk2.default.red('Please provide the asset name!!!'));
    process.exit(1);
}

// Check whether the given variant is available or not
var selectedAsset = _assets2.default.filter(function (asset) {
    return asset.name === _commander2.default.args[0];
})[0];
if (!selectedAsset) {
    console.log(_chalk2.default.red.bold(_commander2.default.args[0] + ' is not a valid WEUS asset. Execute \'weus list\' to list available asset'));
    process.exit(1);
}

// Process the assets json file into an array
var selectedAssetArr = Object.keys(selectedAsset).map(function (k) {
    var obj = {};
    obj[k.charAt(0).toUpperCase() + k.slice(1)] = selectedAsset[k];
    return obj;
});

// Show all the assets in a table
var assetsTable = new _cliTable2.default();
assetsTable.push.apply(assetsTable, _toConsumableArray(selectedAssetArr));
console.log(_chalk2.default.green(assetsTable.toString()));
process.exit(0);