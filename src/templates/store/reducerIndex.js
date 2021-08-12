const { DIRECTORIES } = require('../../constants')

module.exports = (name, dir) => {
  const filePath = dir === DIRECTORIES.reducers ? `./${name}.reducers` : `./${dir.replace(DIRECTORIES.reducers, '')}${name}.reducers`
  return `
import { combineReducers } from 'redux'
import ${name} from '${filePath}'

const rootReducer = combineReducers({
  ${name},
})

export default rootReducer
`
}
