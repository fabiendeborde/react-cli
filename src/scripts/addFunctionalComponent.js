const capitalize = require('../utils/capitalize')
const DIRECTORIES = require('../constants').DIRECTORIES

const {
  createPackage,
  createJSX,
  createStyle,
  createStory,
  createTest
} = require('../utils/createFiles')

module.exports = (options) => {
  // console.log('Add Memo', options)
  const name = capitalize(options.name)
  let dir = `${DIRECTORIES.component}${name}`
  if (options.folder) dir = `${DIRECTORIES.component}${options.folder}/${name}`

  createPackage(name, dir)
  createJSX(name, dir, options)
  createStyle(name, dir, options.style)
  createStory(name, dir)
  createTest(name, dir)
}
