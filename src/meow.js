#!/usr/bin/env node
const meow = require('meow')
const chalk = require('chalk')
const constants = require('./constants')

const help = meow(`
  ${chalk.green.bold('Usage: re4ct [command] [--options]')}

  ${chalk.red('Options:')}
      ${chalk('--name, -n  Specify the name of the component|page|action&reducer (required except for boilerplate command)')}
      ${chalk('--folder, -f  Specify a folder to save the component|page|action&reducer (optional, does not work for boilerplate command)')}
      ${chalk('--default, -d  Use default settings instead of using the prompt questions (optional, work only for the boilerplate command)')}

  ${chalk.yellow('Commands:')}
        ${chalk.white('memo              create a new memo component')}
        ${chalk.white('fn                create a new functional component')}
        ${chalk.white('cp                create a new functional component')}
        ${chalk.white('pcp               create a new pure component')}
        ${chalk.white('page              create a new page')}
        ${chalk.white('rdx               add a new set of action & reducer')}
        ${chalk.white('boilerplate        add a new full project boilerplate code')}
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
    style: {
      type: 'string',
      alias: 's',
      default: 'styled'
    },
    default: {
      type: 'boolean',
      alias: 'd',
      default: false
    }
  }
})

module.exports = help
