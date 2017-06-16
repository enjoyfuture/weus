import path from 'path';
import fs from 'fs';
import ejs from 'ejs';
import pathIsAbsolute from 'path-is-absolute';
import mkdirp from 'mkdirp';
import pathExists from 'path-exists';
import glob from 'glob';

class Actions {

  /**
   * 同步创建目录
   * @param dir
   * @param callback
   */
  createDir(dir, callback) {
    pathExists(dir).then((exist) => {
      if (!exist) {
        mkdirp(dir, callback);
      } else {
        callback();
      }
    });
  }

  /**
   * 异步创建目录
   * @param dir
   */
  createDirSync(dir) {
    if (!pathExists.sync(dir)) {
      mkdirp.sync(dir);
    }
  }

  /**
   * copy
   * @param source
   * @param dest
   */
  copy(source, dest) {
    const _source = Array.isArray(source) ? source : [source];
    const _dest = Array.isArray(dest) ? dest : [dest];
    const tmplPath = this.templatePath(_source);
    const destPath = this.destinationPath(_dest);

    let contents = '';
    try {
      contents = fs.readFileSync(tmplPath, 'utf8');
      const directory = destPath.substring(0, destPath.lastIndexOf('/'));
      this.createDir(directory, () => {
        fs.writeFileSync(destPath, contents);
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
  copyTpl(source, dest, contents = {}) {
    const _source = Array.isArray(source) ? source : [source];
    const _dest = Array.isArray(dest) ? dest : [dest];
    const tmplPath = this.templatePath(_source);
    const destPath = this.destinationPath(_dest);

    let template = '';
    try {
      template = fs.readFileSync(tmplPath, 'utf8');
      template = ejs.render(template, contents);
      const directory = destPath.substring(0, destPath.lastIndexOf('/'));

      this.createDir(directory, () => {
        fs.writeFileSync(destPath, template);
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
  read(source) {
    let contents = '';
    try {
      contents = fs.readFileSync(source, 'utf8');
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
  write(dest, contents) {
    try {
      const directory = dest.substring(0, dest.lastIndexOf('/'));
      this.createDir(directory, () => {
        fs.writeFileSync(dest, contents);
      });
    } catch (e) {
      console.log(e);
      throw new Error('write content to file failed!');
    }
  }

  updateJson(file, options = {}) {
    let contents = this.read(file);
    const jsonO = JSON.parse(contents);
    Object.keys(options).forEach((key) => {
      if (options[key]) {
        jsonO[key] = options[key];
      }
    });

    contents = JSON.stringify(jsonO, null, '  ');
    this.write(file, contents)
  }

  /**
   * copy all files in directory
   * @param source
   * @param dest
   */
  directory(source, dest) {
    const _source = Array.isArray(source) ? source : [source];
    const _dest = Array.isArray(dest) ? dest : [dest];
    const tmplPath = this.templatePath(_source);
    const destPath = this.destinationPath(_dest);

    //All files in source
    const files = glob.sync('**', {dot: true, nodir: true, cwd: tmplPath});

    for (let i = 0, len = files.length; i < len; i++) {
      this.copy(path.join(tmplPath, files[i]), path.join(destPath, files[i]));
    }
  }

  /**
   * template dir
   * @param source
   * @returns {string}
   */
  templatePath(source = []) {
    let filepath = path.join(...source);

    if (!pathIsAbsolute(filepath)) {
      if (this.context) {
        filepath = path.join(__dirname, '..', '..', 'templates', this.context, ...source);
      } else {
        filepath = path.join(__dirname, '..', '..', 'templates', ...source);
      }
    }

    return filepath;
  }

  /**
   * dest dir
   * @param dest
   * @returns {{filePath}|{filePath, configName}|*|string|Promise.<*>}
   */
  destinationPath(dest = []) {
    let filepath = path.join(...dest);
    if (!pathIsAbsolute(filepath)) {
      const pwd = process.env.pwd || process.env.Pwd || process.env.PWD;
      filepath = path.join(pwd, ...dest);
    }
    // 以下方法可以指定当前工作目录
    //process.chdir(filepath);
    return filepath;
  }

}

const actions = {};

actions.create = () => {
  return new Actions();
};

export default actions;
