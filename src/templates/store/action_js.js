const { DIRECTORIES } = require('../../constants')

module.exports = (dir) => {
  const typesPath = dir !== DIRECTORIES.actions ? '../../types' : '../types'
  return `import {
  SOME_TYPE
} from '${typesPath}'

export const action = (payload) => (dispatch, getState, api) => {
  console.log('payload', payload)
  dispatch({ type: SOME_TYPE })
}
`
}
