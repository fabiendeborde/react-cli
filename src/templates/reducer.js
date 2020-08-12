module.exports = (name, dir) => {
  const typesPath = dir !== '/src/reducers/' ? '../../types' : '../types'
  return `
import { createReducer } from '@reduxjs/toolkit'

import {
  MY_TYPE
} from '${typesPath}'

const INITIAL_STATE = {}

export default createReducer(INITIAL_STATE, {
  [MY_TYPE]: (state, action) => {
    // state.loading = true
  }
})
`
}
