const { DIRECTORIES } = require('../../constants')

module.exports = (dir) => {
  const typesPath = dir !== DIRECTORIES.actions ? '../../types' : '../types'
  const rootStatePath = dir !== DIRECTORIES.actions ? '../../index' : '../index'
  return `import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '${rootStatePath}'
import {
  SOME_TYPE
} from '${typesPath}'

export const simpleAction = (payload) => {
  console.log('payload', payload)
  return { type: SOME_TYPE }
}
export const thunkAction = (payload): ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
  console.log('payload', payload)
  dispatch({ type: SOME_TYPE })
}
`
}
