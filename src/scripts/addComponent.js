const capitalize = require('../utils/capitalize')

const {
  createPackage,
  createComponent,
  createStyle,
  createTest
} = require('../utils/createFiles')

module.exports = (options, directory) => {
  console.log('Add Component', options)
  const name = capitalize(options.name)
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
