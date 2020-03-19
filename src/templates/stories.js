
module.exports = (name) => {
  return `
import React from 'react'
import { action } from '@storybook/addon-actions'
import ${name} from './${name}

export default {
  title: ${name},
  component: ${name}
}

// export const Text = () => <Button onClick={action('clicked')}>Hello Button</Button>
`
}
