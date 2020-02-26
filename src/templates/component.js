module.exports = (name) => {
  return `
import React from 'react'
// import PropTypes from 'prop-types'
// import {} from '${name}.style.js'

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
