const jsx = require('../templates/component')
const packageJson = require('../templates/packageJson')
const style = require('../templates/style')
const stories = require('../templates/stories')
const createFile = require('../utils/createFiles')
const capitalize = require('../utils/capitalize')
const DIRECTORIES = require('../constants').DIRECTORIES

module.exports = (options) => {
  // console.log('Add Pure Component', options)
  const name = capitalize(options.name)
  let dir = `${DIRECTORIES.component}${name}`
  if (options.folder) dir = `${DIRECTORIES.component}${options.folder}/${name}`

  createFile('package.json', packageJson(name), dir)
  createFile(`${name}.jsx`, jsx(name), dir)
  createFile(`${name}.style.js`, style(name), dir)
  createFile(`${name}.stories.js`, stories(name), dir)
  createFile(`${name}.test.js`, '', dir)
}
