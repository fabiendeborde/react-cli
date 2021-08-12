const prompts = require('prompts')
const execa = require('execa')
const Listr = require('Listr')
const { projectInstall } = require('pkg-install')

const questions = [
  {
    type: 'toggle',
    name: 'yarn',
    message: 'Do you want to Yarn instead of NPM?',
    initial: true,
    active: 'Yarn',
    inactive: 'NPM'
  },
  {
    type: 'toggle',
    name: 'git',
    message: 'Do you want to initialize a Git repository?',
    initial: true,
    active: 'yes',
    inactive: 'no'
  },
  {
    type: 'toggle',
    name: 'redux',
    message: 'Do you want to use Redux?',
    initial: true,
    active: 'yes',
    inactive: 'no'
  },
  {
    type: prev => prev === true ? 'toggle' : null,
    name: 'saga',
    message: 'Do you want to use Redux-Saga?',
    initial: false,
    active: 'yes',
    inactive: 'no'
  },
  {
    type: 'toggle',
    name: 'router',
    message: 'Do you want to use React Router?',
    initial: true,
    active: 'yes',
    inactive: 'no'
  },
  {
    type: 'select',
    name: 'style',
    message: 'What styling method do you want to use?',
    initial: 1,
    choices: [
      { title: 'styled-component', description: 'Add styled-component and setup babel', value: 'styled-component' },
      { title: 'sass', value: 'sass' },
      { title: 'scss', value: 'scss' },
      { title: 'css', value: 'css' }
    ]
  },
  {
    type: 'toggle',
    name: 'storybook',
    message: 'Do you want to use StoryBook?',
    initial: false,
    active: 'yes',
    inactive: 'no'
  },
  {
    type: 'toggle',
    name: 'i18n',
    message: 'Do you want to use i18n?',
    initial: false,
    active: 'yes',
    inactive: 'no'
  },
  {
    type: 'toggle',
    name: 'validation',
    message: 'Do you want to use form validation?',
    initial: false,
    active: 'yes',
    inactive: 'no'
  },
  {
    type: 'toggle',
    name: 'analytics',
    message: 'Do you want to use Google Analytics?',
    initial: false,
    active: 'yes',
    inactive: 'no'
  }
]

const addReact = () => {

}
const addGit = async () => {
  const result = await execa('git', ['init'], {
    cwd: options.targetDirectory
  })
  if (result.failed) {
    return Promise.reject(new Error('Failed to initialize git'))
  }
}
const addRedux = () => {

}
const addSaga = () => {

}
const addRouter = () => {

}
const addStyle = () => {

}
const addStory = () => {

}
const addI18n = () => {

}
const addFormValidation = () => {

}

const addBoilerplate = (config) => {
  console.log('Node version is: ' + process.version)
  console.log('Add Boilerplate', config)
  // Check if folder exists, if it doesn't create it
}

module.exports = async (options) => {
  console.log('options', options)
  let responses = {
    yarn: true,
    git: true,
    redux: true,
    saga: false,
    router: true,
    style: 'sass',
    storybook: false,
    i18n: false,
    validation: true,
    analytics: false
  }
  if (!options.default) {
    try {
      responses = await prompts(questions)
    } catch (error) {
      throw new Error('Error parsing CLI responses.')
    }
  }
  addBoilerplate({ ...responses, name: options.name })
}
