const jsx = require('../templates/page')
const packageJson = require('../templates/packageJson')
const cypressSample = require('../templates/cypressSample')
const style = require('../templates/style')
const createFile = require('../utils/createFiles')
const capitalize = require('../utils/capitalize')
const DIRECTORIES = require('../constants').DIRECTORIES

module.exports = (options) => {
  // console.log('Add Page', options)
  const name = `${capitalize(options.name)}Page`
  const dir = `${DIRECTORIES.page}${name}`
  const cypressDir = `${DIRECTORIES.cypress}${name}`

  createFile('package.json', packageJson(name), dir)
  createFile(`${name}.jsx`, jsx(name), dir)
  createFile(`${name}.style.js`, style(name), dir)
  createFile(`${name}.test.js`, '', dir)
  createFile(`${name}.spec.js`, cypressSample(name), cypressDir)
}
