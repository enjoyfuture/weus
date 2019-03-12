import commander from 'commander';
import chalk from 'chalk';
import Table from 'cli-table';
import assets from '../../assets.json';

commander
  .parse(process.argv);

if (!commander.args.length) {
  commander.help();
}

if (commander.args.length < 1) {
  console.log(chalk.red('Please provide the asset name!!!'));
  process.exit(1);
}

// Check whether the given variant is available or not
const selectedAsset = assets.filter(asset => asset.name === commander.args[0])[0];
if (!selectedAsset) {
  console.log(chalk.red.bold(`${commander.args[0]} is not a valid WEUS asset. Execute 'weus list' to list available asset`));
  process.exit(1);
}

// Process the assets json file into an array
const selectedAssetArr = Object.keys(selectedAsset).map((k) => {
  const obj = {};
  obj[k.charAt(0).toUpperCase() + k.slice(1)] = selectedAsset[k];
  return obj;
});

// Show all the assets in a table
const assetsTable = new Table();
assetsTable.push(...selectedAssetArr);
console.log(chalk.green(assetsTable.toString()));
process.exit(0);
