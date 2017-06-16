import commander from 'commander';
import chalk from 'chalk';
import Table from 'cli-table';
import assets from '../../assets.json';

commander
    .parse(process.argv);

const assetsTable = new Table({
    head: ['Name', 'Description', 'Author'],
});

// Make a variants table to show to all the variants
assetsTable.push(...assets.map(v => Object.keys(v).map((k) => v[k]).slice(0, 3)));

console.log(chalk.yellow('WEUS assets'));
console.log(chalk.yellow('-------------'));
console.log(assetsTable.toString());
console.log(chalk.yellow('For more info, execute "weus info <asset_name>"'));

process.exit(0);
