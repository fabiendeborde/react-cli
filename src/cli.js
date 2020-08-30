#!/usr/bin/env node
const chalk = require('chalk')
const cli = require('./meow')
const COMMAND_LIST = require('./constants').COMMAND_LIST
const input = cli.input[0]
const flags = cli.flags
flags.input = input

const addMemo = require('./scripts/addMemo')
const addFunctionalComponent = require('./scripts/addFunctionalComponent')
const addComponent = require('./scripts/addComponent')
const addPureComponent = require('./scripts/addPureComponent')
const addPage = require('./scripts/addPage')
const addActionReducer = require('./scripts/addActionReducer')
const addBoilerplate = require('./scripts/addBoilerplate')

const nameRequired = (fn) => {
  if (flags && flags.name) {
    if (fn) fn(flags)
  } else {
    console.warn(chalk.red(`
      Please specify a --name option.
    `))
  }
}

if (input && COMMAND_LIST.includes(input)) {
  switch (input) {
    case 'memo':
      nameRequired(addMemo)
      break
    case 'fn':
      nameRequired(addFunctionalComponent)
      break
    case 'cp':
      nameRequired(addComponent)
      break
    case 'pcp':
      nameRequired(addPureComponent)
      break
    case 'page':
      nameRequired(addPage)
      break
    case 'rdx':
      nameRequired(addActionReducer)
      break
    case 'create':
      nameRequired(addBoilerplate)
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
