const { DIRECTORIES } = require('../constants')
const capitalize = require('../utils/capitalize')

const {
  createPackage,
  createComponent,
  createStyle,
  createTest
} = require('../utils/createFiles')

module.exports = (options) => {
  // console.log('Add Component', options)
  const { isPage } = options
  const directory = isPage ? DIRECTORIES.page : DIRECTORIES.component
  const componentName = isPage ? `${options.name}Page` : options.name
  const name = capitalize(componentName)
  const { memo, javascript } = options
  let dir = `${directory}${name}`
  if (options.folder) dir = `${directory}${options.folder}/${name}`

  createPackage({ name, dir, javascript })
  createComponent({
    name,
    dir,
    memo,
    javascript
  })
  createStyle({ name, dir, javascript })
  createTest({ name, dir, javascript })
}
