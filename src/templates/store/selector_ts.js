module.exports = () => {
  return `import { createSelector } from 'reselect'
import { RootState } from '../index'

const selectSomething = (state: RootState) => state.something

export const selectSomethingData = createSelector(
  selectSomething,
  something => something?.loading
)
`
}
