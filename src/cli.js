#!/usr/bin/env node
const chalk = require('chalk')
const cli = require('./meow')
const COMMAND_LIST = require('./constants').COMMAND_LIST
const input = cli.input[0]
const flags = cli.flags
flags.input = input

const addComponent = require('./scripts/addComponent')
const addActionReducer = require('./scripts/addActionReducer')

const nameRequired = (fn, options) => {
  if (flags && flags.name) {
    if (fn) {
      fn({
        ...flags, ...options
      })
    }
  } else {
    console.warn(chalk.red(`
      Please specify a --name option.
    `))
  }
}

if (input && COMMAND_LIST.includes(input)) {
  switch (input) {
    case 'cp':
      nameRequired(addComponent, { isPage: false })
      break
    case 'page':
      nameRequired(addComponent, { isPage: true })
      break
    case 'rdx':
      nameRequired(addActionReducer)
      break
    default:
      break
  }
} else {
  console.warn(chalk.red(`
    Command not found.
    Use --help to check the available commands and options.
  `))
}
