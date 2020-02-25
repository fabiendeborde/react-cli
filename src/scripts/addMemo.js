const jsx = require('../templates/memo')
const packageJson = require('../templates/packageJson')
const style = require('../templates/style')
const createFile = require('../utils/createFiles')
const capitalize = require('../utils/capitalize')
const DIRECTORIES = require('../constants').DIRECTORIES

module.exports = (options) => {
  // console.log('Add Memo', options)
  const name = capitalize(options.name)
  const dir = `${DIRECTORIES.component}${name}`

  createFile('package.json', packageJson(name), dir)
  createFile(`${name}.jsx`, jsx(name), dir)
  createFile(`${name}.style.js`, style(name), dir)
  createFile(`${name}.test.js`, '', dir)
}
