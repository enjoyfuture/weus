import commander from 'commander';
import pjson from '../../package.json';

commander
  .version(pjson.version)
  .description('Initialize a WEUS powered project')
  .command('init [name]', 'Initialize a WEUS project.')
  .command('list', 'List WEUS assets')
  .command('search [name]', 'Search for WEUS assets')
  .command('info [name]', 'View details of a WEUS asset')
  .parse(process.argv);

if (!commander.args.length) {
  commander.help();
}
