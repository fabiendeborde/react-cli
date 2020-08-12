module.exports = (name, options) => {
  return `
import { createReducer } from '@reduxjs/toolkit'

import {
  MY_TYPE
} from '../../types'

const INITIAL_STATE = {}

export default createReducer(INITIAL_STATE, {
  [MY_TYPE]: (state, action) => {
    // state.loading = true
  }
})
`
}
