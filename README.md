# weus
A Comprehensive Guide for generator web platform. The following are assets.

* React Boilerplate containing Webpack, Gulp, React, Redux, Router, Immutable, etc.
* 基于 fis3 jQuery KnockoutJS RequireJS 搭建的前端开发框架，支持 ie7+

## Installation

First, install weus using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g @weus/cli --registry=http://jnpm.cbpmgt.com/
```

Then generate your new project:

```bash
mkdir demo
cd demo
# 在当前目录下创建工程
weus init 
# 在新的目录中创建工程
weus init projectName
```

## Install Dependencies

```bash
cd projectName # 如果执行了命令 weus init projectName
npm install
```

## Generate your module

```
weusg moduleName
```

Note: First, Assets support custom to create the module.
The "moduleName" is you enter module name. 
After exec this command, it will create "react component", "redux action", and "redux reducer" etc. 
for "react-redux-router-base" asset.

## Other Command

* `weus info <asset_name>` 查看指定基础框架信息
* `weus list` 查看所有基础框架信息
* `weus search [options]` 根据给定的信息搜索基础框架信息

## Weus assets

You can view [ths weus assets](./assets.json).

## Help and Version

```bash
weus -v // Check CLI version
weus --help // Get help and check usage
```

## Weus Development

## development

```
npm run watch
```

### build 

```
npm run build
```

### npm publish

```
npm publish
```

## Change Log

[Change Log](./CHANGELOG.md)


## Reference

* https://github.com/nowa-webpack/nowa
* http://mern.io/