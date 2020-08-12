const prompts = require('prompts')

const questions = [
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
  }
]

const addBoilerplate = (config) => {

}

module.exports = async (options) => {
  console.log('Add Boilerplate', options)
  if (options.default) {
    const responses = {
      redux: true,
      saga: false,
      router: true,
      style: 'sass',
      storybook: false,
      i18n: false,
      validation: true
    }
    addBoilerplate(responses)
    console.log(responses)
  } else {
    try {
      const responses = await prompts(questions)
      addBoilerplate(responses)
      console.log(responses)
    } catch (error) {
      throw new Error('Error parsing CLI responses.')
    }
  }
}
