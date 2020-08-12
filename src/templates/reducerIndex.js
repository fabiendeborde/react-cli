module.exports = (name, dir) => {
  const filePath = dir === '/src/reducers/' ? `./${name}.reducers` : `./${dir.replace('/src/reducers/', '')}.reducers`
  return `
import { combineReducers } from 'redux'
import ${name} from '${filePath}'

const rootReducer = combineReducers({
  ${name},
})

export default rootReducer
`
}
