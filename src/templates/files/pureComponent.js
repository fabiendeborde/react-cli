const style = require('../../utils/importStyle')
module.exports = (name, options) => {
  return `
import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
${style(name, options.style)}

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
