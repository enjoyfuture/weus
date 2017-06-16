import commander from 'commander';
import chalk from 'chalk';
import Table from 'cli-table';
import assets from '../../assets.json';

commander
    .parse(process.argv);

if (!commander.args.length) {
    commander.help();
}

if (commander.args.length > 1) {
    console.log(chalk.red('Please give only one argument as a search term!!!'));
    process.exit(1);
}

const input = commander.args[0];
const assetsTable = new Table({
    head: ['Name', 'Description', 'Author'],
});
const filteredAssets = assets.filter(variant => variant.name.toLowerCase().search(input.toLowerCase()) !== -1 || variant.description.toLowerCase().search(input.toLowerCase()) !== -1);

// Make a variants table to show to all the variants matched with the given search string
assetsTable.push(...filteredAssets.map(v => Object.keys(v).map((k) => v[k]).slice(0, 3)));

console.log(chalk.yellow(`Search results for ${input}`));
console.log(chalk.yellow('-------------'));
console.log(assetsTable.toString());
console.log(chalk.yellow('For more info, execute "weus info <asset_name>"'));

process.exit(0);
