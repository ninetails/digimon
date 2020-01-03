import yargs from 'yargs'
import getConfig from '@digimon/tooling-helpers/lib/getConfig'

interface TestArgs {
  config: string
}

function test (args: TestArgs): void {
  console.log('test!', args)
}

export default yargs
  .scriptName('@digimon/tooling-jest')
  .command(
    '$0',
    'Testing with Jest with some defaults',
    yargs =>
      yargs
        .option('config', {
          alias: 'c',
          default: getConfig(['jest.config.js'], [process.cwd(), __dirname], null)
        }),
    argv => test(argv as TestArgs)
  )
  .parserConfiguration({
    // @ts-ignore
    'unknown-options-as-args': true
  })
