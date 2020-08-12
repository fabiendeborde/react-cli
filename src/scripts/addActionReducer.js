const DIRECTORIES = require('../constants').DIRECTORIES

const {
  createAction,
  createReducer
} = require('../utils/createFiles')

module.exports = (options) => {
  console.log('Add Action & Reducer', options)
  const { name, folder } = options
  let actionDir = `${DIRECTORIES.actions}`
  let reducerDir = `${DIRECTORIES.reducers}`
  if (options.folder) {
    actionDir = `${DIRECTORIES.actions}${folder}/${name}`
    reducerDir = `${DIRECTORIES.reducers}${folder}/${name}`
  }

  createAction(name, actionDir)
  createReducer(name, reducerDir)
}
