const style = require('../../utils/importStyle')
module.exports = (name, options) => {
  return `
import React from 'react'
// import PropTypes from 'prop-types'
${style(name, options.style)}

const ${name} = (props) => {
  return (
    <div>${name}</div>
  )
}
export default ${name}

${name}.propTypes = {

}
${name}.defaultProps = {

}
`
}
