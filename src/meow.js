#!/usr/bin/env node
const meow = require('meow')
const chalk = require('chalk')
const constants = require('./constants')

const help = meow(`
  ${chalk.green.bold('Usage: re4ct [command] [--options]')}

  ${chalk.red('Options:')}
      ${chalk('--name, -n  Specify the name of the component|page|action&reducer (required)')}
      ${chalk('--folder, -f  Specify a folder to save the component|page|action&reducer (optional)')}
      ${chalk('--memo, -m Specify if the component|page should be memoized (optional)')}
      ${chalk('--javascript, -j Specify if the files should be .js and not .ts (optional)')}

  ${chalk.yellow('Commands:')}
        ${chalk.white('cp                create a new functional component')}
        ${chalk.white('page              create a new page')}
        ${chalk.white('rdx               add a new set of action & reducer')}
  `, {
  boolean: constants.COMMAND_LIST,
  flags: {
    name: {
      type: 'string',
      alias: 'n',
      default: '',
      isRequired: true
    },
    folder: {
      type: 'string',
      alias: 'f',
      default: ''
    },
    memo: {
      type: 'boolean',
      alias: 'm',
      default: false
    },
    javascript: {
      type: 'boolean',
      alias: 'j',
      default: false
    }
  }
})

module.exports = help
