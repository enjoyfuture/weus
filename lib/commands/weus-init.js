'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _elegantSpinner = require('elegant-spinner');

var _elegantSpinner2 = _interopRequireDefault(_elegantSpinner);

var _logUpdate = require('log-update');

var _logUpdate2 = _interopRequireDefault(_logUpdate);

var _fullname = require('fullname');

var _fullname2 = _interopRequireDefault(_fullname);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _actions = require('../generate/actions');

var _actions2 = _interopRequireDefault(_actions);

require('shelljs/global');

var _assets = require('../../assets.json');

var _assets2 = _interopRequireDefault(_assets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var frame = (0, _elegantSpinner2.default)();

_commander2.default.description('Create an app in current directory based on react redux router webpack etc.').parse(process.argv);

// 当前目录路径
var pwd = process.env.pwd || process.env.Pwd || process.env.PWD;
// 创建的 app 文件夹
var appFolder = '';
// 选择的模板
var selectedAsset = null;
// git 资源 map
var assetsMap = {};
// git 资源列表
var assetList = _assets2.default.map(function (asset) {
  assetsMap[asset.name] = asset;
  return asset.name;
});

// 如果没有安装 git ，给出提示
/* eslint-disable no-undef*/
if (!which('git')) {
  console.log(_chalk2.default.red('用 weus 生成 react 工程需要你先安装 git!!!'));
  exit(1);
}

// 只支持一个参数，参数名为项目名称
if (_commander2.default.args.length > 1) {
  console.log(_chalk2.default.red('只能输入一个参数作为项目的名称!!!'));
  exit(1);
}

// 如果输入一个参数，需要创建文件夹
if (_commander2.default.args.length === 1) {
  if (test('-d', _commander2.default.args[0])) {
    console.log(_chalk2.default.red(_commander2.default.args[0] + ' \u76EE\u5F55\u5DF2\u5B58\u5728\uFF0C\u8BF7\u91CD\u65B0\u547D\u540D\u4E00\u4E2A\u65B0\u540D\u79F0!!!'));
    exit(1);
  }

  appFolder = _commander2.default.args[0];

  mkdir('-p', _commander2.default.args[0]);
  cd(_commander2.default.args[0]);
}

// 从 gitlab 中拉取模板
var fetchRepFromGit = function fetchRepFromGit() {
  return new Promise(function (resolve, reject) {
    var interval = setInterval(function () {
      (0, _logUpdate2.default)('Fetching the boilerplate...' + _chalk2.default.cyan.bold.dim(frame()));
    }, 50);

    exec('git init');

    // Pull the corresponding variant into the given folder repository
    var gitRepo = assetsMap[selectedAsset];
    exec('git pull ' + gitRepo.git + ' ' + gitRepo['git-branch'], function (code) {
      clearInterval(interval);
      _logUpdate2.default.clear();
      if (code !== 0) {
        return reject(new Error('Error! Try again'));
      }
      return resolve();
    });
  });
};

// 自定义输入内容
(0, _fullname2.default)().then(function (name) {
  console.log(_chalk2.default.green('Hello ' + name + '\uFF0C\u4F60\u597D\uFF01'));

  var currentDirName = pwd.substring(pwd.lastIndexOf('/') + 1, pwd.length);
  var appNameMessage = _commander2.default.args.length === 1 ? ' you enter target: [' + _commander2.default.args[0] + ']' : 'current directory name: [' + currentDirName + ']';

  appNameMessage = 'Please enter the name of app, the default is' + appNameMessage;

  var questions = [{
    type: 'list',
    name: 'weusStarter',
    message: 'Please choice a WEUS repository',
    choices: assetList,
    default: 0
  }, {
    type: 'input',
    name: 'appName',
    message: appNameMessage
  }, {
    type: 'input',
    name: 'version',
    message: 'Please enter the version of app, the default is: [0.1.0]'
  }, {
    type: 'input',
    name: 'author',
    message: 'Please enter the author of app, multiple authors by spacing. You can enter directly.'
  }, {
    type: 'input',
    name: 'keywords',
    message: 'Please enter the keywords of app, multiple keywords by commas. You can enter directly.'
  }, {
    type: 'input',
    name: 'description',
    message: 'Please enter the description of app.'
  }];

  _inquirer2.default.prompt(questions).then(function (answers) {
    var version = answers.version;
    var weusStarter = answers.weusStarter,
        appName = answers.appName,
        author = answers.author,
        keywords = answers.keywords,
        description = answers.description;

    name = appName || currentDirName;
    version = version || '0.1.0';
    selectedAsset = weusStarter;

    fetchRepFromGit().then(function () {
      console.log(_chalk2.default.green(''));
      console.log(_chalk2.default.green('---------------------------------------------------'));
      console.log(_chalk2.default.green('You generate a app basing on WEUS success.'));
      console.log(_chalk2.default.green('You can exec the command [npm install] to install the dependencies.'));
      console.log(_chalk2.default.green('You can open the file "README.md" to view detailed commands.'));
      console.log(_chalk2.default.green('---------------------------------------------------'));

      // 完成后替换模板内容
      var actionsInst = _actions2.default.create();

      // 修改 package.json
      actionsInst.updateJson(_path2.default.join(pwd, appFolder, 'package.json'), {
        name: name,
        version: version,
        author: author,
        description: description,
        keywords: keywords && keywords.split(',')
      });
    }, function () {
      console.log(_chalk2.default.red.bold('Error! Try again'));
      exit(1);
    });
  });
});