const DIRECTORIES = require('../constants').DIRECTORIES

const {
  createAction,
  createReducer,
  createSelector,
  createTypes
} = require('../utils/createFiles')

module.exports = (options) => {
  // console.log('Add Action & Reducer', options)
  const { name, folder } = options
  let actionDir = `${DIRECTORIES.actions}`
  let reducerDir = `${DIRECTORIES.reducers}`
  let selectorDir = `${DIRECTORIES.selectors}`
  let typeDir = `${DIRECTORIES.types}`
  if (options.folder) {
    actionDir = `${DIRECTORIES.actions}${folder}/`
    reducerDir = `${DIRECTORIES.reducers}${folder}/`
    selectorDir = `${DIRECTORIES.selectors}${folder}/`
    typeDir = `${DIRECTORIES.types}${folder}/`
  }

  createAction({ name, dir: actionDir })
  createReducer({ name, dir: reducerDir })
  createSelector({ name, dir: selectorDir })
  createTypes({ name, dir: typeDir })
}
