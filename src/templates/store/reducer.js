const { DIRECTORIES } = require('../../constants')

module.exports = (dir) => {
  const typesPath = dir !== DIRECTORIES.reducers ? '../../types' : '../types'
  return `import { createReducer } from '@reduxjs/toolkit'

import {
  SOME_TYPE
} from '${typesPath}'

const INITIAL_STATE = {}

export default createReducer(INITIAL_STATE, {
  [SOME_TYPE]: (state, action) => {
    // state.loading = true
  }
})
`
}
