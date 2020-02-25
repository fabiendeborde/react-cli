const fs = require('fs')
const chalk = require('chalk')
const currentDir = process.cwd()

module.exports = (fileName, content, path) => {
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
