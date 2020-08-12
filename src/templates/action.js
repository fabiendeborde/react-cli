module.exports = (name, dir) => {
  const typesPath = dir !== '/src/actions/' ? '../../types' : '../types'
  return `
import {

} from '${typesPath}'

export const action = () => (dispatch, getState, api) => {

}
`
}
