import yargs from 'yargs'
import digimon, { DigimonArgs } from '@digimon/core'

export default yargs
  .scriptName('digimon')
  .demand(2)
  .usage('Usage: npx $0 [-f][-p <path>] <repo> <target>')
  .example(
    'npx $0 -f -p packages/core ninetails/digimon core',
    'extracts content on packages/core from github repo ninetails/digimon overriding contents on core folder'
  )
  .option('force', {
    alias: 'f',
    describe: 'override files on current destination folder',
    type: 'boolean',
    default: false
  })
  .option('path', {
    alias: 'p',
    describe: 'traverse a folder inside a repo',
    type: 'string'
  })
  .command(
    '$0 <repo> <target>',
    'get contents',
    yargs =>
      yargs
        .positional('repo', {
          describe: 'repository location',
          type: 'string'
        })
        .positional('target', {
          describe: 'destination',
          type: 'string'
        }),
    argv => digimon(argv as DigimonArgs)
  )
  .strict()
  .showHelpOnFail(true)
  .help('h')
  .alias('h', 'help')
