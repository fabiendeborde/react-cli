module.exports = (name) => {
  return `import React from 'react'
// import PropTypes from 'prop-types'
// import {  } from './${name}.style'

function ${name} (): React.ReactElement {
  return (
    <div>${name}</div>
  )
}
export default ${name}

// ${name}.propTypes = {

// }
`
}
