#!/usr/bin/env node
const meow = require('meow')
const chalk = require('chalk')
const constants = require('./constants')

const help = meow(`
  ${chalk.green.bold('Usage: re4ct [command] [--options]')}

  ${chalk.red('Options:')}
      ${chalk('--name, -n  Specify the name of the memo|component|page|action&reducer (required except for boilerplate & redux commands)')}
      ${chalk('--folder, -f  Specify a folder to save the memo|component|page (optional, works only with memo, cp, pcp & page)')}

  ${chalk.yellow('Commands:')}
        ${chalk.white('memo              create a new memo component')}
        ${chalk.white('fn                create a new functional component')}
        ${chalk.white('cp                create a new functional component')}
        ${chalk.white('pcp               create a new pure component')}
        ${chalk.white('page              create a new page')}
        ${chalk.gray('action-reducer     add a new set of action & reducer')}
        ${chalk.gray('redux              add redux to the project')}
        ${chalk.gray('boilerplate        add a new full project boilerplate code')}
  `, {
  boolean: constants.COMMAND_LIST,
  flags: {
    name: {
      type: 'string',
      alias: 'n',
      default: ''
    },
    folder: {
      type: 'string',
      alias: 'f',
      default: ''
    },
    redux: {
      type: 'boolean',
      alias: 'x',
      default: false
    }
  }
})

module.exports = help
