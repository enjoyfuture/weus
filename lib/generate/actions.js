'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _pathIsAbsolute = require('path-is-absolute');

var _pathIsAbsolute2 = _interopRequireDefault(_pathIsAbsolute);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _pathExists = require('path-exists');

var _pathExists2 = _interopRequireDefault(_pathExists);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Actions = function () {
  function Actions() {
    _classCallCheck(this, Actions);
  }

  _createClass(Actions, [{
    key: 'createDir',


    /**
     * 同步创建目录
     * @param dir
     * @param callback
     */
    value: function createDir(dir, callback) {
      (0, _pathExists2.default)(dir).then(function (exist) {
        if (!exist) {
          (0, _mkdirp2.default)(dir, callback);
        } else {
          callback();
        }
      });
    }

    /**
     * 异步创建目录
     * @param dir
     */

  }, {
    key: 'createDirSync',
    value: function createDirSync(dir) {
      if (!_pathExists2.default.sync(dir)) {
        _mkdirp2.default.sync(dir);
      }
    }

    /**
     * copy
     * @param source
     * @param dest
     */

  }, {
    key: 'copy',
    value: function copy(source, dest) {
      var _source = Array.isArray(source) ? source : [source];
      var _dest = Array.isArray(dest) ? dest : [dest];
      var tmplPath = this.templatePath(_source);
      var destPath = this.destinationPath(_dest);

      var contents = '';
      try {
        contents = _fs2.default.readFileSync(tmplPath, 'utf8');
        var directory = destPath.substring(0, destPath.lastIndexOf('/'));
        this.createDir(directory, function () {
          _fs2.default.writeFileSync(destPath, contents);
        });
      } catch (e) {
        console.log(e);
        throw new Error('copy file failed!');
      }
    }

    /**
     * copy Template
     * @param source
     * @param dest
     * @param contents
     */

  }, {
    key: 'copyTpl',
    value: function copyTpl(source, dest) {
      var contents = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var _source = Array.isArray(source) ? source : [source];
      var _dest = Array.isArray(dest) ? dest : [dest];
      var tmplPath = this.templatePath(_source);
      var destPath = this.destinationPath(_dest);

      var template = '';
      try {
        template = _fs2.default.readFileSync(tmplPath, 'utf8');
        template = _ejs2.default.render(template, contents);
        var directory = destPath.substring(0, destPath.lastIndexOf('/'));

        this.createDir(directory, function () {
          _fs2.default.writeFileSync(destPath, template);
        });
      } catch (e) {
        console.log(e);
        throw new Error('copyTpl file failed!');
      }
    }

    /**
     * read file content
     * @param source
     * @returns {string}
     */

  }, {
    key: 'read',
    value: function read(source) {
      var contents = '';
      try {
        contents = _fs2.default.readFileSync(source, 'utf8');
      } catch (e) {
        console.log(e);
        throw new Error('read file failed!');
      }
      return contents;
    }

    /**
     * write file
     * @param dest
     * @param contents
     */

  }, {
    key: 'write',
    value: function write(dest, contents) {
      try {
        var directory = dest.substring(0, dest.lastIndexOf('/'));
        this.createDir(directory, function () {
          _fs2.default.writeFileSync(dest, contents);
        });
      } catch (e) {
        console.log(e);
        throw new Error('write content to file failed!');
      }
    }
  }, {
    key: 'updateJson',
    value: function updateJson(file) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var contents = this.read(file);
      var jsonO = JSON.parse(contents);
      Object.keys(options).forEach(function (key) {
        if (options[key]) {
          jsonO[key] = options[key];
        }
      });

      contents = JSON.stringify(jsonO, null, '  ');
      this.write(file, contents);
    }

    /**
     * copy all files in directory
     * @param source
     * @param dest
     */

  }, {
    key: 'directory',
    value: function directory(source, dest) {
      var _source = Array.isArray(source) ? source : [source];
      var _dest = Array.isArray(dest) ? dest : [dest];
      var tmplPath = this.templatePath(_source);
      var destPath = this.destinationPath(_dest);

      //All files in source
      var files = _glob2.default.sync('**', { dot: true, nodir: true, cwd: tmplPath });

      for (var i = 0, len = files.length; i < len; i++) {
        this.copy(_path2.default.join(tmplPath, files[i]), _path2.default.join(destPath, files[i]));
      }
    }

    /**
     * template dir
     * @param source
     * @returns {string}
     */

  }, {
    key: 'templatePath',
    value: function templatePath() {
      var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var filepath = _path2.default.join.apply(_path2.default, _toConsumableArray(source));

      if (!(0, _pathIsAbsolute2.default)(filepath)) {
        if (this.context) {
          filepath = _path2.default.join.apply(_path2.default, [__dirname, '..', '..', 'templates', this.context].concat(_toConsumableArray(source)));
        } else {
          filepath = _path2.default.join.apply(_path2.default, [__dirname, '..', '..', 'templates'].concat(_toConsumableArray(source)));
        }
      }

      return filepath;
    }

    /**
     * dest dir
     * @param dest
     * @returns {{filePath}|{filePath, configName}|*|string|Promise.<*>}
     */

  }, {
    key: 'destinationPath',
    value: function destinationPath() {
      var dest = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var filepath = _path2.default.join.apply(_path2.default, _toConsumableArray(dest));
      if (!(0, _pathIsAbsolute2.default)(filepath)) {
        var pwd = process.env.pwd || process.env.Pwd || process.env.PWD;
        filepath = _path2.default.join.apply(_path2.default, [pwd].concat(_toConsumableArray(dest)));
      }
      // 以下方法可以指定当前工作目录
      //process.chdir(filepath);
      return filepath;
    }
  }]);

  return Actions;
}();

var actions = {};

actions.create = function () {
  return new Actions();
};

exports.default = actions;