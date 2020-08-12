const fs = require('fs')
const chalk = require('chalk')
const currentDir = process.cwd()

const { DIRECTORIES } = require('../constants')

const packageJson = require('../templates/files/packageJson')
const style = require('../templates/files/style')
const stories = require('../templates/files/stories')
const cypressSample = require('../templates/files/cypressSample')
const action = require('../templates/files/action')
const reducer = require('../templates/files/reducer')
const reducerIndexTemplate = require('../templates/files/reducerIndex')

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
const updateActionIndex = (name, dir) => {
  const fullPath = `${currentDir}${DIRECTORIES.actions}`
  const indexContent = `export * from './${dir.replace('/src/actions/', '')}.actions'\n`
  try {
    // check if at the root of the project
    if (fs.existsSync(`${currentDir}/package.json`)) {
      // Check if directory exists (create it if it doesn't)
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true }, (err) => {
          if (err) throw err
        })
      }
      const filePath = `${fullPath}/index.js`
      // Check if the target file already exists (create if it doesn't)
      if (!fs.existsSync(filePath)) {
        fs.writeFile(filePath, indexContent, function (err) {
          if (err) throw err
          console.log(chalk.green(`Action index created (with ${name}.actions support)`))
        })
      } else {
        // update file here
        fs.appendFile(filePath, indexContent, function (err) {
          if (err) throw err
          console.log(chalk.green(`Index updated to support ${name}.actions`))
        })
      }
    } else {
      console.warn(chalk.yellow('No package.json found in this directory. Are you sure your project has been initialized?'))
    }
  } catch (error) {
    console.warn(chalk.red(`Oops! An error occured while trying to create ${name} action...`))
  }
}
const updateReducerIndex = (name, dir) => {
  const fullPath = `${currentDir}${DIRECTORIES.reducers}`
  // const indexContent = `export * from './${dir.replace('/src/reducers/', '')}.reducers'\n`
  try {
    // check if at the root of the project
    if (fs.existsSync(`${currentDir}/package.json`)) {
      // Check if directory exists (create it if it doesn't)
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true }, (err) => {
          if (err) throw err
        })
      }
      const filePath = `${fullPath}/index.js`
      // Check if the target file already exists (create if it doesn't)
      if (!fs.existsSync(filePath)) {
        fs.writeFile(filePath, reducerIndexTemplate(name, dir), function (err) {
          if (err) throw err
          console.log(chalk.green(`Action index created (with ${name}.actions support)`))
        })
      } else {
        // update file here
        fs.readFile(filePath, 'utf-8', (err, data) => {
          if (err) {
            return console.error(err)
          }
          const importIndex = data.indexOf('\nconst rootReducer')
          const importPath = dir === '/src/reducers/' ? `./${name}.reducers` : `./${dir.replace('/src/reducers/', '')}.reducers`
          const importText = `import ${name} from '${importPath}'\n`
          const updatedText = `${data.slice(0, importIndex)}${importText}${data.slice(importIndex)}`

          const declarationIndex = updatedText.indexOf('})\n\nexport default rootReducer')
          const declarationText = `  ${name},\n`
          const modifiedText = `${updatedText.slice(0, declarationIndex)}${declarationText}${updatedText.slice(declarationIndex)}`

          fs.writeFile(filePath, modifiedText, (err, result) => {
            if (err) {
              return console.error(err)
            }
            console.log(chalk.green(`Index updated to support ${name}.reducers`))
          })
        })
      }
    } else {
      console.warn(chalk.yellow('No package.json found in this directory. Are you sure your project has been initialized?'))
    }
  } catch (error) {
    console.warn(chalk.red(`Oops! An error occured while trying to create ${name} reducer...`))
  }
}

const createPackage = (name, dir) => {
  createFile('package.json', packageJson(name), dir)
}
const createJSX = (name, dir, options) => {
  let jsx
  switch (options.input) {
    case 'memo':
      jsx = require('../templates/files/memo')
      break
    case 'fn':
      jsx = require('../templates/files/functionalComponent')
      break
    case 'cp':
      jsx = require('../templates/files/component')
      break
    case 'pcp':
      jsx = require('../templates/files/pureComponent')
      break
    case 'page':
      jsx = require('../templates/files/page')
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
const createAction = (name, dir) => {
  createFile(`${name}.actions.js`, action(name, dir), dir)
  updateActionIndex(name, dir)
}

const createReducer = (name, dir) => {
  createFile(`${name}.reducers.js`, reducer(name, dir), dir)
  updateReducerIndex(name, dir)
}

module.exports = {
  createPackage,
  createJSX,
  createStyle,
  createStory,
  createTest,
  createCypress,
  createAction,
  createReducer
}
