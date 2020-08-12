module.exports = (name, dir) => {
  return `
import { combineReducers } from 'redux'
import ${name} from './${dir.replace('/src/reducers/', '')}.reducers'

const rootReducer = combineReducers({
  ${name},
})

export default rootReducer
`
}
