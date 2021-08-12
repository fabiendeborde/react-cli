const capitalize = require('../utils/capitalize')
const DIRECTORIES = require('../constants').DIRECTORIES

const {
  createPackage,
  createJSX,
  createStyle,
  createTest,
  createCypress
} = require('../utils/createFiles')

module.exports = (options) => {
  // console.log('Add Page', options)
  const name = `${capitalize(options.name)}Page`
  let dir = `${DIRECTORIES.page}${name}`
  if (options.folder) dir = `${DIRECTORIES.page}${options.folder}/${name}`

  createPackage(name, dir)
  createJSX(name, dir, options)
  createStyle(name, dir, options.style)
  createTest(name, dir)
  createCypress(name, dir)
}
