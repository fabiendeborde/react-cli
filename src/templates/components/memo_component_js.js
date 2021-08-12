module.exports = (name) => {
  return `import React, { memo } from 'react'
// import PropTypes from 'prop-types'
// import {  } from './${name}.style'

function ${name} (props) {
  return (
    <div>${name}</div>
  )
}
export default memo(${name})

${name}.propTypes = {

}
${name}.defaultProps = {

}
`
}
