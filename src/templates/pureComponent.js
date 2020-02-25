module.exports = (name) => {
  return `
import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
// import {} from '${name}.style.js'

class ${name} extends PureComponent {

  render() {
    return (
      <div>

      </div>
    )
  }
}

export default ${name}

${name}.propTypes = {

}
`
}
