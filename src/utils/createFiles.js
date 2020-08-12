const fs = require('fs')
const chalk = require('chalk')
const currentDir = process.cwd()

const { DIRECTORIES } = require('../constants')

const packageJson = require('../templates/packageJson')
const style = require('../templates/style')
const stories = require('../templates/stories')
const cypressSample = require('../templates/cypressSample')
const action = require('../templates/action')
const reducer = require('../templates/reducer')
const reducerIndexTemplate = require('../templates/reducerIndex')

const createFile = (fileName, content, path) => {
  const fullPath = `${currentDir}${path}`
  try {
    // check if at the root of the project
    if (fs.existsSync(`${currentDir}/package.json`)) {
      // Check if directory exists (create it if it doesn't)
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true }, (err) => {
          if (err) throw err
        })
      }
      const filePath = `${fullPath}/${fileName}`
      // Check if the target file already exists (abort if it does)
      if (!fs.existsSync(filePath)) {
        fs.writeFile(filePath, content, function (err) {
          if (err) throw err
          console.log(chalk.green(`File created (${fileName})`))
        })
      } else {
        console.warn(chalk.yellow(`File already exists. (Will not overwrite ${fileName})`))
      }
    } else {
      console.warn(chalk.yellow('No package.json found in this directory. Are you sure your project has been initialized?'))
    }
  } catch (error) {
    console.warn(chalk.red(`Oops! An error occured while trying to create ${fileName}...`))
  }
}

const createPackage = (name, dir) => {
  createFile('package.json', packageJson(name), dir)
}
const createJSX = (name, dir, options) => {
  let jsx
  switch (options.input) {
    case 'memo':
      jsx = require('../templates/memo')
      break
    case 'fn':
      jsx = require('../templates/functionalComponent')
      break
    case 'cp':
      jsx = require('../templates/component')
      break
    case 'pcp':
      jsx = require('../templates/pureComponent')
      break
    case 'page':
      jsx = require('../templates/page')
      break
    default:
      break
  }
  if (jsx) createFile(`${name}.jsx`, jsx(name, options), dir)
  // console.log('options', options)
  // console.log('jsx', jsx)
}
const createStyle = (name, dir, styleOption) => {
  switch (styleOption) {
    case 'css':
      createFile(`${name}.css`, '', dir)
      break
    case 'scss':
      createFile(`${name}.scss`, '', dir)
      break
    case 'sass':
      createFile(`${name}.sass`, '', dir)
      break
    default:
      createFile(`${name}.style.js`, style(name), dir)
      break
  }
}
const createStory = (name, dir) => {
  createFile(`${name}.stories.js`, stories(name), dir)
}
const createTest = (name, dir) => {
  createFile(`${name}.test.js`, '', dir)
}
const createCypress = (name, dir) => {
  createFile(`${name}.spec.js`, cypressSample(name), dir)
}

module.exports = {
  createPackage,
  createJSX,
  createStyle,
  createStory,
  createTest,
  createCypress
}
