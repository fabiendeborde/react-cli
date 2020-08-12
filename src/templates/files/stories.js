
module.exports = (name) => {
  return `
import React from 'react'
import ${name} from './${name}'

export default {
  title: '${name}',
  component: ${name}
}

// export const Text = () => <${name} />
`
}
