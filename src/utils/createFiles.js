const fs = require('fs')
const fsPromises = require('fs').promises
const chalk = require('chalk')
const currentDir = process.cwd()

const { DIRECTORIES } = require('../constants')

const packageJson = require('../templates/components/packageJson')
const reducer = require('../templates/store/reducer')
const type = require('../templates/store/type')
const reducerIndexTemplate = require('../templates/store/reducerIndex')

const createFile = async (fileName, content, path) => {
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
        try {
          await fsPromises.writeFile(filePath, content)
          console.log(chalk.green(`File created (${fileName})`))
          return true
        } catch (error) {
          console.warn(chalk.yellow(`File already exists. (Will not overwrite ${fileName})`))
          throw error
        }
      } else {
        console.warn(chalk.yellow(`File already exists. (Will not overwrite ${fileName})`))
        return false
      }
    } else {
      console.warn(chalk.yellow('No package.json found in this directory. Are you sure your project has been initialized?'))
      return false
    }
  } catch (error) {
    console.warn(chalk.red(`Oops! An error occured while trying to create ${fileName}...`))
    throw error
  }
}
const updateActionIndex = (name, dir, extension) => {
  const fullPath = `${currentDir}${DIRECTORIES.actions}`
  const indexContent = `export * from './${dir.replace(DIRECTORIES.actions, '')}${name}.actions'\n`
  try {
    // check if at the root of the project
    if (fs.existsSync(`${currentDir}/package.json`)) {
      // Check if directory exists (create it if it doesn't)
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true }, (err) => {
          if (err) throw err
        })
      }
      const filePath = `${fullPath}/index.${extension}`
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
const updateReducerIndex = (name, dir, extension) => {
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
      const filePath = `${fullPath}/index.${extension}`
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
          const importPath = dir === DIRECTORIES.reducers ? `./${name}.reducers` : `./${dir.replace(DIRECTORIES.reducers, '')}${name}.reducers`
          const importText = `import ${name} from '${importPath}'\n`
          const updatedText = `${data.slice(0, importIndex)}${importText}${data.slice(importIndex)}`

          const declarationIndex = updatedText.indexOf('\n})\n\nexport default rootReducer')
          const declarationText = `,\n  ${name}`
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
const updateSelectorIndex = (name, dir, extension) => {
  const fullPath = `${currentDir}${DIRECTORIES.selectors}`
  const indexContent = `export * from './${dir.replace(DIRECTORIES.selectors, '')}${name}.selectors'\n`
  try {
    // check if at the root of the project
    if (fs.existsSync(`${currentDir}/package.json`)) {
      // Check if directory exists (create it if it doesn't)
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true }, (err) => {
          if (err) throw err
        })
      }
      const filePath = `${fullPath}/index.${extension}`
      // Check if the target file already exists (create if it doesn't)
      if (!fs.existsSync(filePath)) {
        fs.writeFile(filePath, indexContent, function (err) {
          if (err) throw err
          console.log(chalk.green(`Selectors index created (with ${name}.selectors support)`))
        })
      } else {
        // update file here
        fs.appendFile(filePath, indexContent, function (err) {
          if (err) throw err
          console.log(chalk.green(`Index updated to support ${name}.selectors`))
        })
      }
    } else {
      console.warn(chalk.yellow('No package.json found in this directory. Are you sure your project has been initialized?'))
    }
  } catch (error) {
    console.warn(chalk.red(`Oops! An error occured while trying to create ${name} selectors...`))
  }
}
const updateTypeIndex = (name, dir, extension) => {
  const fullPath = `${currentDir}${DIRECTORIES.types}`
  const indexContent = `export * from './${dir.replace(DIRECTORIES.types, '')}${name}.types'\n`
  try {
    // check if at the root of the project
    if (fs.existsSync(`${currentDir}/package.json`)) {
      // Check if directory exists (create it if it doesn't)
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true }, (err) => {
          if (err) throw err
        })
      }
      const filePath = `${fullPath}/index.${extension}`
      // Check if the target file already exists (create if it doesn't)
      if (!fs.existsSync(filePath)) {
        fs.writeFile(filePath, indexContent, function (err) {
          if (err) throw err
          console.log(chalk.green(`Types index created (with ${name}.types support)`))
        })
      } else {
        // update file here
        fs.appendFile(filePath, indexContent, function (err) {
          if (err) throw err
          console.log(chalk.green(`Index updated to support ${name}.types`))
        })
      }
    } else {
      console.warn(chalk.yellow('No package.json found in this directory. Are you sure your project has been initialized?'))
    }
  } catch (error) {
    console.warn(chalk.red(`Oops! An error occured while trying to create ${name} types...`))
  }
}

const createPackage = ({ name, dir, javascript }) => {
  const extension = javascript ? 'jsx' : 'tsx'
  createFile('package.json', packageJson(name, extension), dir)
}
const createComponent = ({ name, dir, memo, javascript }) => {
  const extension = javascript ? 'jsx' : 'tsx'
  const jsOrTs = javascript ? '_js' : '_ts'
  const isMemo = memo ? 'memo_' : ''
  const component = require(`../templates/components/${isMemo}component${jsOrTs}`)

  if (component) createFile(`${name}.${extension}`, component(name), dir)
  // console.log('options', options)
  // console.log('jsx', jsx)
}
const createStyle = ({ name, dir, javascript }) => {
  const extension = javascript ? 'js' : 'ts'
  const style = require('../templates/components/style')
  createFile(`${name}.style.${extension}`, style, dir)
}
const createTest = ({ name, dir, javascript }) => {
  const extension = javascript ? 'js' : 'ts'
  createFile(`${name}.spec.${extension}`, '', dir)
}

const createAction = async ({ name, dir, javascript }) => {
  const extension = javascript ? 'js' : 'ts'
  const jsOrTs = javascript ? '_js' : '_ts'
  const action = require(`../templates/store/action${jsOrTs}`)
  try {
    const result = await createFile(`${name}.actions.${extension}`, action(dir), dir)
    if (result) updateActionIndex(name, dir, extension)
  } catch (error) {
    console.warn(chalk.red(`Oops! An error occured while trying to create ${name} action...`))
  }
}
const createReducer = async ({ name, dir, javascript }) => {
  const extension = javascript ? 'js' : 'ts'
  try {
    const result = await createFile(`${name}.reducers.${extension}`, reducer(dir), dir)
    if (result) updateReducerIndex(name, dir, extension)
  } catch (error) {
    console.warn(chalk.red(`Oops! An error occured while trying to create ${name} action...`))
  }
}
const createSelector = async ({ name, dir, javascript }) => {
  const extension = javascript ? 'js' : 'ts'
  const jsOrTs = javascript ? '_js' : '_ts'
  const selector = require(`../templates/store/selector${jsOrTs}`)
  try {
    const result = await createFile(`${name}.selectors.${extension}`, selector(), dir)
    if (result) updateSelectorIndex(name, dir, extension)
  } catch (error) {
    console.warn(chalk.red(`Oops! An error occured while trying to create ${name} action...`))
  }
}
const createTypes = async ({ name, dir, javascript }) => {
  const extension = javascript ? 'js' : 'ts'
  try {
    const result = await createFile(`${name}.types.${extension}`, type(), dir)
    if (result) updateTypeIndex(name, dir, extension)
  } catch (error) {
    console.warn(chalk.red(`Oops! An error occured while trying to create ${name} action...`))
  }
}

module.exports = {
  createPackage,
  createComponent,
  createStyle,
  createTest,
  createAction,
  createReducer,
  createSelector,
  createTypes
}
