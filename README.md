# weus
A Comprehensive Guide for React Boilerplate containing Webpack, Gulp, React, Redux, Router, Immutable, etc.


## Installation

First, install weus using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g weus
```

Then generate your new project:

```bash
mkdir demo
cd demo
weus init
```

## Install Dependencies

```bash
cd demo && npm install
```

### start your project server:

```bash
npm run dll
npm start
```

### Unit Test
```bash
npm run test
```
or watch test

```bash
npm run test-watch
```

### build your project:

```bash
npm run build
```

## Generate your module

```
weusg moduleName
```

Note: The "moduleName" is you enter module name. After exec this command, 
it will create "react component", "redux action", and "redux reducer" etc.


## Weus Development

### wern templates

The wern-cli generator react templates can download from the github `https://github.com/enjoyfuture/wern-template`.

### compile 

```
npm run compile
```

### npm publish

```
npm publish
```

## Change Log

[Change Log](./CHANGELOG.md)


## Help and Version

```bash
wern -v // Check CLI version
wern --help // Get help and check usage
```


## Reference

* https://github.com/nowa-webpack/nowa
