import path from 'path';
import chalk from 'chalk';
import commander from 'commander';
import elegantSpinner from 'elegant-spinner';
import logUpdate from 'log-update';
import fullname from 'fullname';
import inquirer from 'inquirer';
import actions from '../generate/actions'
import 'shelljs/global';
import assets from '../../assets.json';

const frame = elegantSpinner();

commander
  .description('Create an app in current directory based on react redux router webpack etc.')
  .parse(process.argv);

// 当前目录路径
const pwd = process.env.pwd || process.env.Pwd || process.env.PWD;
// 创建的 app 文件夹
let appFolder = '';
// 选择的模板
let selectedAsset = null;
// git 资源 map
const assetsMap = {};
// git 资源列表
const assetList = assets.map((asset) => {
  assetsMap[asset.name] = asset;
  return asset.name;
});

// 如果没有安装 git ，给出提示
/* eslint-disable no-undef*/
if (!which('git')) {
  console.log(chalk.red('用 weus 生成 react 工程需要你先安装 git!!!'));
  exit(1);
}

// 只支持一个参数，参数名为项目名称
if (commander.args.length > 1) {
  console.log(chalk.red('只能输入一个参数作为项目的名称!!!'));
  exit(1);
}

// 如果输入一个参数，需要创建文件夹
if (commander.args.length === 1) {
  if (test('-d', commander.args[0])) {
    console.log(chalk.red(`${commander.args[0]} 目录已存在，请重新命名一个新名称!!!`));
    exit(1);
  }

  appFolder = commander.args[0];

  mkdir('-p', commander.args[0]);
  cd(commander.args[0]);
}

// 从 git 中拉取模板
const fetchRepFromGit = () => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      logUpdate(`Fetching the boilerplate...${chalk.cyan.bold.dim(frame())}`);
    }, 50);

    exec('git init');

    // Pull the corresponding variant into the given folder repository
    const gitRepo = assetsMap[selectedAsset];
    exec(`git pull ${gitRepo.git} ${gitRepo['git-branch']}`, (code) => {
      clearInterval(interval);
      logUpdate.clear();
      if (code !== 0) {
        return reject(new Error('Error! Try again'));
      }
      return resolve();
    });
  });
};

// 自定义输入内容
fullname().then((name) => {
  console.log(chalk.green(`Hello ${name}，你好！`));

  const currentDirName = pwd.substring(pwd.lastIndexOf('/') + 1, pwd.length);
  let appNameMessage = commander.args.length === 1 ? ` you enter target: [${commander.args[0]}]` :
    `current directory name: [${currentDirName}]`;

  appNameMessage = `Please enter the name of app, the default is${appNameMessage}`;

  const questions = [
    {
      type: 'list',
      name: 'weusStarter',
      message: 'Please choice a WEUS repository',
      choices: assetList,
      default: 0
    },
    {
      type: 'input',
      name: 'appName',
      message: appNameMessage
    },
    {
      type: 'input',
      name: 'version',
      message: 'Please enter the version of app, the default is: [0.1.0]'
    },
    {
      type: 'input',
      name: 'author',
      message: 'Please enter the author of app, multiple authors by spacing. You can enter directly.'
    },
    {
      type: 'input',
      name: 'keywords',
      message: 'Please enter the keywords of app, multiple keywords by commas. You can enter directly.'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Please enter the description of app.'
    }
  ];

  inquirer.prompt(questions).then((answers) => {
    let {version} = answers;
    const {weusStarter, appName, author, keywords, description} = answers;
    name = appName || currentDirName;
    version = version || '0.1.0';
    selectedAsset = weusStarter;

    fetchRepFromGit().then(() => {
      console.log(chalk.green(''));
      console.log(chalk.green('---------------------------------------------------'));
      console.log(chalk.green('You generate a app basing on WEUS success.'));
      console.log(chalk.green(`You can exec the command [${appFolder ? `cd ${appFolder} && ` : ''}npm install] to install the dependencies.`));
      console.log(chalk.green('You can open the file "README.md" to view detailed commands.'));
      console.log(chalk.green('---------------------------------------------------'));

      // 完成后替换模板内容
      const actionsInst = actions.create();

      // 修改 package.json
      actionsInst.updateJson(path.join(pwd, appFolder, 'package.json'), {
        name,
        version,
        author,
        description,
        keywords: keywords && keywords.split(','),
      });

    }, () => {
      console.log(chalk.red.bold('Error! Try again'));
      exit(1);
    });
  });
});
